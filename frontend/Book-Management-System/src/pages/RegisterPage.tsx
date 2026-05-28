import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRedirectIfAuth } from '@/hooks/useRedirectIfAuth';
import { authService } from '@/services/auth.service';
import RegisterForm from '@/components/forms/RegisterForm';
import Button from '@/components/ui/Button';
import logoImage from '@/assets/mm.png';
import { toast } from 'sonner';
import type { RegisterFormData } from '@/validations/schemas';
import { getErrorMessage } from '@/utils/helpers';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading: initialLoading } = useRedirectIfAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...payload } = data;
      await authService.register(payload);
      toast.success('Registration successful! Please sign in.');
      navigate('/login', { replace: true });
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (initialLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6">
        <div className="rounded-[2rem] border border-border bg-surface p-10 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-3 rounded-full bg-accent-50 px-4 py-2 text-accent-700 mb-6 shadow-sm">
              <img src={logoImage} alt="BookHub logo" className="w-5 h-5 object-cover rounded-full" />
              <span className="text-sm font-semibold">BookHub</span>
            </div>
            <h1 className="text-3xl font-semibold text-text">Create an account</h1>
            <p className="mt-2 text-muted">Sign up and start managing your books from one polished dashboard.</p>
          </div>

          <div className="space-y-4">
            <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />

            <Button variant="secondary" size="md" className="w-full" onClick={() => navigate('/')}>Return home</Button>

            <div className="text-center text-sm text-muted">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-accent-600 hover:text-accent-700 transition">
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-accent-50 p-5 shadow-sm">
          <p className="text-sm text-accent-900">
            <span className="font-semibold">Pro tip:</span> Use an email you check regularly so you can recover access later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
