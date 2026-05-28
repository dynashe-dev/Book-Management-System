import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit2, Trash2 } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { booksService } from '@/services/books.service';
import ErrorState from '@/components/common/ErrorState';
import { CardSkeleton } from '@/components/common/Skeleton';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';
import { formatDate } from '@/utils/helpers';

const BookDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const bookId = id ? parseInt(id, 10) : 0;
  const queryClient = useQueryClient();
  const { user, isLoading: authLoading } = useRequireAuth();
  const [deleteModal, setDeleteModal] = useState(false);

  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => booksService.getBookById(bookId),
    enabled: !!user && !authLoading && !!bookId,
  });

  const deleteMutation = useMutation({
    mutationFn: () => booksService.deleteBook(bookId),
    onSuccess: () => {
      toast.success('Book deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['books'] });
      navigate('/books');
    },
    onError: () => {
      toast.error('Failed to delete book');
    },
  });

  if (authLoading || !user) {
    return null;
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          <CardSkeleton />
        </div>
      </MainLayout>
    );
  }

  if (error || !book) {
    return (
      <MainLayout>
        <ErrorState
          title="Book not found"
          message="The book you're looking for doesn't exist."
          onRetry={() => navigate('/books')}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-text">{book.title}</h1>
              <p className="mt-2 text-muted">by {book.author}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => navigate(`/books/${book.id}/edit`)}
                className="inline-flex items-center gap-2"
              >
                <Edit2 size={18} />
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => setDeleteModal(true)}
                className="inline-flex items-center gap-2"
              >
                <Trash2 size={18} />
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="rounded-[1.75rem] border border-border bg-surface p-8 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-muted mb-2">ISBN</p>
                <p className="text-lg font-mono text-text">{book.isbn}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted mb-2">Published Year</p>
                <p className="text-lg text-text">{book.publishedYear}</p>
              </div>
            </div>
            {book.description && (
              <div className="mt-8">
                <p className="text-sm font-semibold text-muted mb-2">Description</p>
                <p className="text-text leading-7">{book.description}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-text mb-4">Metadata</h3>
              <div className="space-y-4 text-sm text-muted">
                <div>
                  <p className="mb-1 text-muted">Added</p>
                  <p className="font-medium text-text">{formatDate(book.createdAt)}</p>
                </div>
                <div>
                  <p className="mb-1 text-muted">Last Updated</p>
                  <p className="font-medium text-text">{formatDate(book.updatedAt)}</p>
                </div>
                <div>
                  <p className="mb-1 text-muted">Book ID</p>
                  <p className="font-mono font-medium text-text">{book.id}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-border bg-accent-50 p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-accent-700 mb-3">Quick Details</h4>
              <div className="space-y-3 text-sm text-accent-900">
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Year:</strong> {book.publishedYear}</p>
                <p><strong>ISBN:</strong> {book.isbn}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Book"
        footer={
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="ghost" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => deleteMutation.mutate()} isLoading={deleteMutation.isPending}>
              Delete
            </Button>
          </div>
        }
      >
        <p className="text-muted">Are you sure you want to delete &quot;{book.title}&quot;? This action cannot be undone.</p>
      </Modal>
    </MainLayout>
  );
};

export default BookDetailsPage;
