import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, BookOpen, Users, TrendingUp } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { booksService } from '@/services/books.service';
import { CardSkeleton } from '@/components/common/Skeleton';
import { formatDate } from '@/utils/helpers';

const DashboardPage: React.FC = () => {
  const { user, isLoading: authLoading } = useRequireAuth();

  const { data: books, isLoading: booksLoading } = useQuery({
    queryKey: ['books'],
    queryFn: booksService.getAllBooks,
    enabled: !!user && !authLoading,
  });

  if (authLoading || booksLoading) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  const bookCount = books?.length || 0;

  const stats = [
    {
      label: 'Total Books',
      value: bookCount,
      icon: BookOpen,
      color: 'bg-accent-50 text-accent-700',
    },
    {
      label: 'Active Library',
      value: bookCount > 0 ? 'Yes' : 'No',
      icon: BarChart3,
      color: 'bg-primary-50 text-primary-700',
    },
    {
      label: 'Last Updated',
      value: books && books.length > 0 ? formatDate(books[0].updatedAt) : 'N/A',
      icon: TrendingUp,
      color: 'bg-secondary-100 text-secondary-700',
    },
    {
      label: 'Your Account',
      value: user?.username || 'User',
      icon: Users,
      color: 'bg-accent-100 text-accent-700',
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">Dashboard</p>
          <h1 className="text-4xl font-semibold text-text">Welcome back, {user?.username}!</h1>
          <p className="text-muted max-w-2xl">Your book library is up to date. Review your latest additions and stay on top of reading activity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted">{stat.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-text">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-2xl`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {books && books.length > 0 && (
          <div className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-border">
              <div>
                <h2 className="text-xl font-semibold text-text">Recent Books</h2>
                <p className="text-sm text-muted">Most recently added books from your library.</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {books.slice(0, 5).map((book) => (
                <div
                  key={book.id}
                  className="flex flex-col gap-3 rounded-3xl border border-border bg-background p-5 transition hover:border-accent-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-text">{book.title}</h3>
                      <p className="text-muted mt-1">by {book.author}</p>
                    </div>
                    <span className="rounded-full bg-accent-50 px-3 py-1 text-sm font-medium text-accent-700">{formatDate(book.createdAt)}</span>
                  </div>
                  <p className="text-sm text-muted">ISBN: {book.isbn} · Published {book.publishedYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
