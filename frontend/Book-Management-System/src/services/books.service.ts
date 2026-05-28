import apiClient from '@/api/client';
import type { Book, CreateBookPayload, UpdateBookPayload } from '@/types';

export const booksService = {
  async getAllBooks(): Promise<Book[]> {
    const response = await apiClient.get('/books');
    return response.data;
  },

  async getBookById(id: number): Promise<Book> {
    const response = await apiClient.get(`/books/${id}`);
    return response.data;
  },

  async createBook(payload: CreateBookPayload): Promise<Book> {
    const response = await apiClient.post('/books', payload);
    return response.data;
  },

  async updateBook(id: number, payload: UpdateBookPayload): Promise<Book> {
    const response = await apiClient.patch(`/books/${id}`, payload);
    return response.data;
  },

  async deleteBook(id: number): Promise<void> {
    await apiClient.delete(`/books/${id}`);
  },
};
