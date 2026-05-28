import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { booksService } from '@/services/books.service';
import ErrorState from '@/components/common/ErrorState';
import { CardSkeleton } from '@/components/common/Skeleton';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateBookSchema, type UpdateBookFormData } from '@/validations/schemas';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';

const EditBookPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { user, isLoading: authLoading } = useRequireAuth();

  const bookId = id ? parseInt(id) : 0;

  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => booksService.getBookById(bookId),
    enabled: !!user && !authLoading && !!bookId,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateBookFormData>({
    resolver: zodResolver(updateBookSchema),
  });

  React.useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publishedYear: book.publishedYear,
        description: book.description,
      });
    }
  }, [book, reset]);

  const updateMutation = useMutation({
    mutationFn: (data: UpdateBookFormData) =>
      booksService.updateBook(bookId, data),
    onSuccess: () => {
      toast.success('Book updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['book', bookId] });
      navigate('/books');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update book';
      toast.error(message);
    },
  });

  if (authLoading || !user) {
    return null;
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto space-y-6">
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
          message="The book you're trying to edit doesn't exist."
          onRetry={() => navigate('/books')}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="rounded-[1.75rem] border border-border bg-surface p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-600">Edit Book</p>
              <h1 className="mt-3 text-3xl font-semibold text-text">Update book details</h1>
              <p className="mt-2 text-muted">Modify the book information and save changes to your library.</p>
            </div>
            <button
              onClick={() => navigate('/books')}
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2 text-sm font-semibold text-text transition hover:bg-secondary-100"
            >
              <ArrowLeft size={18} />
              Back to Books
            </button>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-border bg-surface p-8 shadow-sm">
          <form onSubmit={handleSubmit((data) => updateMutation.mutate(data))} className="space-y-6">
            <Input
              label="Title"
              type="text"
              placeholder="Book title"
              error={errors.title?.message}
              {...register('title')}
            />

            <Input
              label="Author"
              type="text"
              placeholder="Author name"
              error={errors.author?.message}
              {...register('author')}
            />

            <Input
              label="ISBN"
              type="text"
              placeholder="ISBN number"
              error={errors.isbn?.message}
              {...register('isbn')}
            />

            <Input
              label="Published Year"
              type="number"
              placeholder="e.g., 2024"
              error={errors.publishedYear?.message}
              {...register('publishedYear', { valueAsNumber: true })}
            />

            <TextArea
              label="Description"
              placeholder="Book description"
              error={errors.description?.message}
              rows={4}
              {...register('description')}
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/books')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={updateMutation.isPending}
              >
                Update Book
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditBookPage;
