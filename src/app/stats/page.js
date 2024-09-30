'use client'
// pages/statistics.js

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Statistics() {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const response = await fetch('/api/stats');
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

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className='w-full flex items-center justify-center flex-col flex-auto'>
      <h2 className="scroll-m-20 w-6/12 text-center mt-12 border-b pb-8 text-3xl font-semibold tracking-tight">
        Статистика астрономический наблюдений    </h2>
      <Table className='w-6/12'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Страна</TableHead>
            <TableHead>Колличество обсерваторий</TableHead>
            <TableHead>Год</TableHead>
            <TableHead className="text-right">Колличество наблюдений</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {statistics.map((stat, index) => (
            <TableRow key={index}>

              <TableCell className="font-medium">{stat.Страна}</TableCell>
              <TableCell>{stat.Обсерватории}</TableCell>
              <TableCell>{stat.Год}</TableCell>
              <TableCell className="text-right">{stat.События}</TableCell>
            </TableRow>

          ))}

        </TableBody>
      </Table>

    </div>
  );
}
