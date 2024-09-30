'use client'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function Statistics() {
  const [statistics, setStatistics] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const schema = z.object({
    min: z.string().regex(/^\d+$/, "Похоже, что это не число"),
    max: z.string().regex(/^\d+$/, "Похоже, что это не число")
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      min: '0',
      max: '0',
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (statistics) {
      reset({
        min: `${statistics.minWorkersAmount}`,
        max: `${statistics.maxWorkersAmount}`,
      }, {
        resolver: zodResolver(schema)
      });
    }
  }, [statistics, reset]);

  function onSubmit(values) {
    fetchValues(values)

  }

  async function fetchValues(values) {
    try {
      const response = await fetch(`/api/workers?min=${values.min}&max=${values.max}`);
      if (!response.ok) {
        throw new Error('Произошла непредвиденная ошибка');
      }
      const data = await response.json();
      setData(data.data)
      setLoading(false);
    } catch (error) {
      setError('Произошла непредвиденная ошибка');
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const response = await fetch('/api/max_workers');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setStatistics(data.data);
        setLoading(false);
      } catch (error) {
        setError('An error occurred while fetching data');
        setLoading(false);
      }
    }

    fetchStatistics();
  }, []);


  return (
    <div className='w-full flex items-center justify-center flex-col  flex-auto'>
      <h2 className="scroll-m-20 w-6/12 text-center mt-12  pb-8 text-3xl font-semibold tracking-tight">
        Поиск Обсерваторий по атрибуту "число рабочих"</h2>

      <Form {...form} id='form'>
        <p className="leading-7 mb-6">        Введите желаемое значение диапозона рабочих для поиска:
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="flex items-start gap-4">
            <FormField
              control={form.control}
              name="min"
              render={({ field }) => (
                <FormItem>
                  <p className="leading-7 mb-6">        От:
                  </p>
                  <FormControl>
                    <Input className='w-full' type="text" placeholder="Число рабочих" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="max"
              render={({ field }) => (
                <FormItem>
                  <p className="leading-7 mb-6">        До:
                  </p>
                  <FormControl>
                    <Input className='w-full' type="text" placeholder="Число рабочих" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <Button type="submit" aria-controls="form">Поиск</Button>
        </form>
      </Form>
      {
        Array.isArray(data) && data.length === 0 && <p className="leading-7 [&:not(:first-child)]:mt-6">
          Обсерватории с колличеством рабочих &gt;= вашему не найденно
        </p>
      }
      {
        Array.isArray(data) && data.length > 0 && (<Table className='w-6/12'>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Название</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Дата открытия</TableHead>
              <TableHead>Широта</TableHead>
              <TableHead>Долгота</TableHead>
              <TableHead className="text-right">Колличество рабочих</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((stat, index) => (
              <TableRow key={index}>

                <TableCell className="font-medium">{stat.name}</TableCell>
                <TableCell>{stat.description}</TableCell>
                <TableCell>{new Date(stat.openDate).toLocaleDateString().replaceAll('/', '.')}</TableCell>
                <TableCell>{stat.latitude}</TableCell>
                <TableCell>{stat.longitude}</TableCell>
                <TableCell className="text-right">{stat.workersAmount}</TableCell>
              </TableRow>

            ))}

          </TableBody>
        </Table>)

      }
    </div>
  );
}
