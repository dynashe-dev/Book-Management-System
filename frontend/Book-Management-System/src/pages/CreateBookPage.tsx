import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { booksService } from '@/services/books.service';
import CreateBookForm from '@/components/forms/CreateBookForm';
import { toast } from 'sonner';
import type { CreateBookFormData } from '@/validations/schemas';

const CreateBookPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isLoading: authLoading } = useRequireAuth();

  const createMutation = useMutation({
    mutationFn: (data: CreateBookFormData) => booksService.createBook(data),
    onSuccess: () => {
      toast.success('Book created successfully!');
      queryClient.invalidateQueries({ queryKey: ['books'] });
      navigate('/books');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create book';
      toast.error(message);
    },
  });

  if (authLoading || !user) {
    return null;
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="rounded-[1.75rem] border border-border bg-surface p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-600">Add Book</p>
              <h1 className="mt-3 text-3xl font-semibold text-text">Create a new entry</h1>
              <p className="mt-2 text-muted">Fill the information below to add a book to your library.</p>
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
          <CreateBookForm
            onSubmit={async (data) => await createMutation.mutateAsync(data)}
            isLoading={createMutation.isPending}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateBookPage;
