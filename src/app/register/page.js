'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'; 
import { Alert } from '@/components/ui/alert';

const registerSchema = z.object({
  username: z.string().min(1, { message: 'Введите логин' }),
  password: z.string().min(6, { message: 'Пароль должен быть длиннее 6-ти символов' }),
});

export default function Register() {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
          localStorage.setItem('user', data.username);
          window.dispatchEvent(new Event('auth'));
          router.push('/');
      } else {
        setErrorMessage(result.message || 'Произошла ошибка');
      }
    } catch (error) {
        console.log(error)
      setErrorMessage('Что-то пошло не так');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 flex-auto">
      <h1 className="text-2xl font-semibold text-center mb-6">Регистрация</h1>

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
          <label htmlFor="password" className="block font-medium mb-1">Password</label>
          <Input
            id="password"
            type="password"
            placeholder="Введите пароль"
            {...register('password')}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Регистрация...' : 'Регистрация'}
        </Button>
      </form>

      <p className="text-center mt-4">
       Уже есть аккаунт?{' '}
        <a href="/login" className="text-blue-500 hover:underline">
          Войдите здесь
        </a>
      </p>
    </div>
  );
}
