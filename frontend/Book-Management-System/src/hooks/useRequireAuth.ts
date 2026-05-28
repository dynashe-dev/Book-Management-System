import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export const useRequireAuth = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, isLoading, navigate]);

  return { user, isLoading };
};
