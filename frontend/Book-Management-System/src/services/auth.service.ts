import apiClient from '@/api/client';
import type { AuthResponse, LoginPayload, RegisterPayload, User } from '@/types';

export const authService = {
  async register(payload: RegisterPayload): Promise<{ message: string; userId: number }> {
    const response = await apiClient.post('/auth/register', payload);
    return response.data;
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/login', payload);
    return response.data;
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return null;
      
      // Try to verify token by making a request
      const userStr = localStorage.getItem('authUser');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      return null;
    }
  },

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  },

  setAuthData(token: string, user: User): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(user));
  },

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  },

  getAuthUser(): User | null {
    const userStr = localStorage.getItem('authUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  },
};
