import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBookSchema, type CreateBookFormData } from '@/validations/schemas';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';

interface CreateBookFormProps {
  onSubmit: (data: CreateBookFormData) => Promise<unknown>;
  isLoading?: boolean;
}

const CreateBookForm: React.FC<CreateBookFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBookFormData>({
    resolver: zodResolver(createBookSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Title"
        type="text"
        placeholder="Book title"
        error={errors.title?.message}
        {...register('title')}
      />

      <Input
        label="Author"
        type="text"
        placeholder="Author name"
        error={errors.author?.message}
        {...register('author')}
      />

      <Input
        label="ISBN"
        type="text"
        placeholder="ISBN number"
        error={errors.isbn?.message}
        {...register('isbn')}
      />

      <Input
        label="Published Year"
        type="number"
        placeholder="e.g., 2024"
        error={errors.publishedYear?.message}
        {...register('publishedYear', { valueAsNumber: true })}
      />

      <TextArea
        label="Description (optional)"
        placeholder="Book description"
        error={errors.description?.message}
        rows={4}
        {...register('description')}
      />

      <Button type="submit" size="md" className="w-full" isLoading={isLoading}>
        Create Book
      </Button>
    </form>
  );
};

export default CreateBookForm;
