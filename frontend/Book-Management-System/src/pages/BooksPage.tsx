import React, { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { booksService } from '@/services/books.service';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import { TableRowSkeleton } from '@/components/common/Skeleton';
import { formatDate } from '@/utils/helpers';
import { toast } from 'sonner';
import type { Book } from '@/types';

const BooksPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isLoading: authLoading } = useRequireAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; bookId?: number }>({
    isOpen: false,
  });

  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: booksService.getAllBooks,
    enabled: !!user && !authLoading,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => booksService.deleteBook(id),
    onSuccess: () => {
      toast.success('Book deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['books'] });
      setDeleteModal({ isOpen: false });
    },
    onError: () => {
      toast.error('Failed to delete book');
    },
  });

  const filteredBooks = useMemo(() => {
    return books.filter(
      (book: Book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm)
    );
  }, [books, searchTerm]);

  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / pageSize));
  const paginatedBooks = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredBooks.slice(startIndex, startIndex + pageSize);
  }, [filteredBooks, page]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  if (authLoading) {
    return null;
  }

  if (error) {
    return (
      <MainLayout>
        <ErrorState
          title="Failed to load books"
          message="There was an error loading your books. Please try again."
          onRetry={() => window.location.reload()}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">Books</p>
            <h1 className="mt-3 text-3xl font-semibold text-text">Manage your collection</h1>
            <p className="mt-2 text-muted">Search, edit, and organize your library in one place.</p>
          </div>
          <Button onClick={() => navigate('/books/new')} className="inline-flex items-center gap-2">
            <Plus size={20} />
            Add Book
          </Button>
        </div>

        <div className="max-w-xl">
          <Input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            icon={<Search size={20} />}
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="rounded-[1.75rem] border border-border bg-surface shadow-sm overflow-hidden">
            <table className="w-full min-w-[640px]">
              <thead className="bg-background border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-text">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-text">Author</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-text">ISBN</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-text">Year</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-text">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRowSkeleton key={i} columns={5} />
                ))}
              </tbody>
            </table>
          </div>
        ) : filteredBooks.length === 0 ? (
          <EmptyState
            title="No books found"
            message={searchTerm ? 'No books match your search.' : 'Start building your library by adding your first book.'}
            action={{
              label: searchTerm ? 'Clear search' : 'Add Book',
              onClick: () => (searchTerm ? handleSearchChange('') : navigate('/books/new')),
            }}
          />
        ) : (
          <>
            <div className="rounded-[1.75rem] border border-border bg-surface shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-background border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-text">Title</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-text">Author</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-text">ISBN</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-text">Year</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-text">Added</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-text">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {paginatedBooks.map((book: Book) => (
                      <tr key={book.id} className="hover:bg-secondary-100 transition">
                        <td className="px-6 py-4">
                          <button
                            onClick={() => navigate(`/books/${book.id}`)}
                            className="font-medium text-accent-600 hover:text-accent-700 transition"
                          >
                            {book.title}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-muted">{book.author}</td>
                        <td className="px-6 py-4 text-muted font-mono">{book.isbn}</td>
                        <td className="px-6 py-4 text-muted">{book.publishedYear}</td>
                        <td className="px-6 py-4 text-muted">{formatDate(book.createdAt)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => navigate(`/books/${book.id}/edit`)}
                              className="rounded-2xl p-2 text-accent-600 hover:bg-accent-50 transition"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => setDeleteModal({ isOpen: true, bookId: book.id })}
                              className="rounded-2xl p-2 text-red-600 hover:bg-red-50 transition"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-4">
                <p className="text-sm text-muted">
                  Showing {paginatedBooks.length} of {filteredBooks.length} books
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <p className="text-sm text-text">Page {page} of {totalPages}</p>
                  <Button
                    variant="ghost"
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        title="Delete Book"
        footer={
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="ghost"
              onClick={() => setDeleteModal({ isOpen: false })}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteModal.bookId && deleteMutation.mutate(deleteModal.bookId)}
              isLoading={deleteMutation.isPending}
            >
              Delete
            </Button>
          </div>
        }
      >
        <p className="text-muted">Are you sure you want to delete this book? This action cannot be undone.</p>
      </Modal>
    </MainLayout>
  );
};

export default BooksPage;
