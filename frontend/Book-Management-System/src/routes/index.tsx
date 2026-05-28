import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import LandingPage from '@/pages/LandingPage';
import BooksPage from '@/pages/BooksPage';
import CreateBookPage from '@/pages/CreateBookPage';
import EditBookPage from '@/pages/EditBookPage';
import BookDetailsPage from '@/pages/BookDetailsPage';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/books',
    element: (
      <ProtectedRoute>
        <BooksPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/books/new',
    element: (
      <ProtectedRoute>
        <CreateBookPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/books/:id',
    element: (
      <ProtectedRoute>
        <BookDetailsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/books/:id/edit',
    element: (
      <ProtectedRoute>
        <EditBookPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/',
    element: <LandingPage />,
  },
]);
