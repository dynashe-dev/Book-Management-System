export interface User {
  id: number;
  email: string;
  username: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  description?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookPayload {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  description?: string;
}

export interface UpdateBookPayload {
  title?: string;
  author?: string;
  isbn?: string;
  publishedYear?: number;
  description?: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}
