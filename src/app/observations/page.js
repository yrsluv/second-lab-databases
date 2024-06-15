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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({

});
export default function Observations() {
  const [statistics, setStatistics] = useState(null);
  const [pickedCountry, setPickedCountry] = useState(null)
  const [countries, setCountries] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countryError, setCountryError] = useState(false)
  const [pickedYear, setPickerYear] = useState(null)
  const [years, setYears] = useState(null)

  const form = useForm({
    resolver: zodResolver(schema),

  })

  function onSubmit(values) {
    fetchObservations(values.year)
  }

  async function fetchObservations(year) {
    if (!pickedCountry || !pickedYear) {
      setCountryError(true)
      return;
    }
    setCountryError(false)
    try {
      const response = await fetch(`/api/observations?country=${pickedCountry}&year=${pickedYear}`);
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

  async function fetchCountries() {
    try {
      const response = await fetch('/api/sync_countries');
      if (!response.ok) {
        throw new Error('Произошла непредвиденная ошибка');
      }
      const data = await response.json();
      setCountries(data.data);
      setLoading(false);
    } catch (error) {
      setError('Произошла непредвиденная ошибка');
      setLoading(false);
    }
  }

  async function fetchYears() {
    try {
      const response = await fetch(`/api/years?country=${pickedCountry}`);
      if (!response.ok) {
        throw new Error('Произошла непредвиденная ошибка');
      }
      const data = await response.json();
      setYears(data.data);
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
    setPickerYear(null);
    setYears(null);
    fetchYears();
  }, [pickedCountry])

  useEffect(() => {
    fetchCountries();
  }, [])

  return (
    <div className='w-full flex items-center justify-center flex-col'>
      <h2 className="scroll-m-20 w-8/12 text-center mt-12  pb-8 text-3xl font-semibold tracking-tight">
        Поиск Астрономических наблюдений по двум атрибутам: "год наблюдения" и "страна Астронома"</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center">
          {
            !countries ? <p className="leading-7 mb-6">
              Загрузка
            </p> : (<DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button className="w-56" variant="outline">{!pickedCountry ? "Выберите страну" : `${countries.find(country => country.id == pickedCountry)?.value}`}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Список стран</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={pickedCountry} onValueChange={(val) => {
                  setPickedCountry(val);
                  setStatistics(null);
                }}>

                  <div className="flex flex-col h-64 overflow-y-scroll">
                    {
                      countries.map(country =>
                        <DropdownMenuRadioItem value={country.id}>{country.value} </DropdownMenuRadioItem>

                      )
                    }
                  </div>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>

            </DropdownMenu>)
          }
          {
            !years || !years.length ? <p className="leading-7 mb-6">
              Нет доступных лет
            </p> : (<DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button className="w-56" variant="outline">{!pickedYear ? "Выберите год" : `${pickedYear}`}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Список доступных лет</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={pickedYear} onValueChange={(val) => {
                  setPickerYear(val);
                  setStatistics(null);
                }}>

                  <div className="flex flex-col h-64 overflow-y-scroll">
                    {
                      years.map(year =>
                        <DropdownMenuRadioItem value={year}>{year} </DropdownMenuRadioItem>

                      )
                    }
                  </div>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>

            </DropdownMenu>)
          }





          <Button type="submit" className='w-6/12'>Поиск</Button>
        </form>
      </Form>
      {
        Array.isArray(statistics) && statistics.length === 0 && <p className="leading-7 [&:not(:first-child)]:mt-6">
          Астрономические наблюдений удовлетворяющие вашим условиям не найдены
        </p>
      }
      {
        Array.isArray(statistics) && statistics.length > 0 && (<Table className='mt-12 w-10/12'>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Название</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Дата открытия</TableHead>
              <TableHead>Обсерватория</TableHead>
              <TableHead>Имя Астронома</TableHead>
              <TableHead>Страна Астронома</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statistics.map((stat, index) => (
              <TableRow key={index}>

                <TableCell className="font-medium">{stat.title}</TableCell>
                <TableCell>{stat.description}</TableCell>
                <TableCell>{new Date(stat.date).toLocaleDateString().replaceAll('/', '.')}</TableCell>
                <TableCell>{stat.observatory.name}</TableCell>
                <TableCell>{stat.astronomer.name}</TableCell>
                <TableCell >{countries.find(country => country.id == stat.astronomer.countryId)?.value}</TableCell>
              </TableRow>

            ))}

          </TableBody>
        </Table>)

      }
    </div>
  );
}
