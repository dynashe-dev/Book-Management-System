import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .min(1, 'Password is required'),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(50, 'Username must be at most 50 characters')
      .min(1, 'Username is required'),
    email: z
      .string()
      .email('Invalid email address')
      .min(1, 'Email is required'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .min(1, 'Password is required'),
    confirmPassword: z
      .string()
      .min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const createBookSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters'),
  author: z
    .string()
    .min(1, 'Author is required')
    .min(2, 'Author must be at least 2 characters'),
  isbn: z
    .string()
    .min(1, 'ISBN is required')
    .regex(/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[X0-9]$/,
      'Invalid ISBN format'
    ),
  publishedYear: z
    .number()
    .int('Published year must be an integer')
    .min(1000, 'Published year must be at least 1000')
    .max(new Date().getFullYear() + 1, `Published year cannot exceed ${new Date().getFullYear() + 1}`),
  description: z
    .string()
    .max(1000, 'Description must be at most 1000 characters')
    .optional()
    .or(z.literal('')),
});

export const updateBookSchema = createBookSchema.partial();

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CreateBookFormData = z.infer<typeof createBookSchema>;
export type UpdateBookFormData = z.infer<typeof updateBookSchema>;
