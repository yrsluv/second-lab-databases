'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'; 
import { Alert } from '@/components/ui/alert';

// Zod schema for form validation
const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export default function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/auth/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success == true) {
        localStorage.setItem('user', result.user.username);
        window.dispatchEvent(new Event("auth"));
        router.push('/', {});
        
      } else {
        setErrorMessage(result.message || 'Что-то пошло не так');
      }
    } catch (error) {
      setErrorMessage('Что-то пошло не так');
    }
  };


  return (
    <div className="max-w-md mx-auto mt-10 flex-auto">
      <h1 className="text-2xl font-semibold text-center mb-6">Авторизация</h1>

      {errorMessage && <Alert variant="destructive">{errorMessage}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="username" className="block font-medium mb-1">Логин</label>
          <Input
            id="username"
            type="text"
            placeholder="Введите логин"
            {...register('username')}
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block font-medium mb-1">Пароль</label>
          <Input
            id="password"
            type="password"
            placeholder="Введите пароль"
            {...register('password')}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Авторизация...' : 'Авторизация'}
        </Button>
      </form>

      <p className="text-center mt-4">
        Нет аккаунта?{' '}
        <a href="/register" className="text-blue-500 hover:underline">
          Зарегестрируйтесь здесь
        </a>
      </p>
    </div>
  );
}
