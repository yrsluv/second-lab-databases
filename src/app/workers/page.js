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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  number: z.string().regex(/^\d+$/, "Похоже, что это не число"),
});

export default function Statistics() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      number: "",
    },
  })

  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    fetchStatistics(values.number)

  }

  async function fetchStatistics(number) {
    try {
      const response = await fetch(`/api/workers?workersAmount=${number}`);
      if (!response.ok) {
        throw new Error('Произошла непредвиденная ошибка');
      }
      const data = await response.json();
      setStatistics(data.data);
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

  return (
    <div className='w-full flex items-center justify-center flex-col'>
      <h2 className="scroll-m-20 w-6/12 text-center mt-12  pb-8 text-3xl font-semibold tracking-tight">
        Поиск Обсерваторий по атрибуту "число рабочих"</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <p className="leading-7 mb-6">        Введите желаемое значение числа рабочих для поиска:
                </p>
                <FormControl>
                  <Input className='w-full' type="text" placeholder="Число рабочих" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Поиск</Button>
        </form>
      </Form>
      {
        Array.isArray(statistics) && statistics.length === 0 && <p className="leading-7 [&:not(:first-child)]:mt-6">
          Обсерватории с колличеством рабочих &gt;= вашему не найденно
        </p>
      }
      {
        Array.isArray(statistics) && statistics.length > 0 && (<Table className='w-6/12'>
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
            {statistics.map((stat, index) => (
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
