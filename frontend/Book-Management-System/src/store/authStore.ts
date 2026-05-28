import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User } from '@/types';
import { authService } from '@/services/auth.service';

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    user: null,
    token: null,
    isLoading: false,
    error: null,

    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),

    logout: () => {
      authService.logout();
      set({
        user: null,
        token: null,
        error: null,
      });
    },

    initialize: async () => {
      set({ isLoading: true });
      try {
        const token = authService.getAuthToken();
        const user = authService.getAuthUser();
        
        if (token && user) {
          set({ token, user });
        }
      } catch (error) {
        set({ error: 'Failed to initialize auth' });
      } finally {
        set({ isLoading: false });
      }
    },
  }), { name: 'auth-store' })
);
