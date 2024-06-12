'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { CountryPicker } from "@/components/countryPicker"
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CountryModal } from "./components/countryModal"
import { AstronomerForm } from "./components/astronomerForm"
import { ObservatoryModal } from "./components/observatoryModal"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Autocomplete, TextField } from '@mui/material';


const titles = [
  'Наблюдение за звездами',
  'Метеоритный дождь',
  'Планетарное выравнивание',
  'Солнечное затмение',
  'Лунное затмение',
  'Наблюдение за кометой',
  'Наблюдение за галактикой',
  'Наблюдение за туманностью',
  'Наблюдение за астероидом',
  'Наблюдение за спутником',
]

const schema = z.object({
  title: z.string(),
  description: z.string(),
});

export default function Observations() {
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);

  const [astronomers, setAstronomers] = useState(null);
  const [observatories, setObservatories] = useState(null);

  const [pickedAstronomer, setPickedAstronomer] = useState(null)
  const [pickedObservatory, setPickedObservatory] = useState(null)
  const [selectedTitle, setSelectedTitle] = useState('');



  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      year: "",
      country: null
    },
  })


  async function onSubmit(values) {
    if (!date || !pickedAstronomer || !pickedObservatory) return;
    try {
      console.log(1)
      const resp = await fetch('/api/observations', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          observatory: pickedObservatory,
          astronomer: pickedAstronomer,
          date: date.toISOString(),
        })
      });
      console.log(resp)
      if (!resp.ok) {
        throw new Error('Произошла непредвиденная ошибка');
      }
      const data = await resp.json();
      setSuccess(data.success);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
    }
  }



  async function fetchObservatories() {
    try {
      const response = await fetch('/api/observatory');
      if (!response.ok) {
        throw new Error('Произошла непредвиденная ошибка');
      }
      const data = await response.json();
      setObservatories(data.data);
    } catch (error) {
    }
  }

  async function fetchAstronomers() {
    try {
      const response = await fetch('/api/astronomer');
      if (!response.ok) {
        throw new Error('Произошла непредвиденная ошибка');
      }
      const data = await response.json();
      setAstronomers(data.data);
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
    fetchAstronomers();
    fetchObservatories();
  }, [])

  return (
    <div className='w-full flex items-center justify-center flex-col'>
      <h2 className="scroll-m-20 w-8/12 text-center mt-12  pb-8 text-3xl font-semibold tracking-tight">
        Добавлениие новых Астрономических наблюдений</h2>
      <div className="flex flex-col gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Добавить новую страну</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавьте новую страну</DialogTitle>
              <DialogDescription>
                <CountryModal />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Добавить астронома</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить астронома</DialogTitle>
              <DialogDescription>
                <AstronomerForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Добавить обсерваторию</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить обсерваторию</DialogTitle>
              <DialogDescription>
                <ObservatoryModal />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Form {...form}>
        {
          success && <p className="leading-7 [&:not(:first-child)]:mt-6 text-green-400">
            Новое наблюдение успешно созданно
          </p>
        }
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10 flex flex-col items-center">
          <h3>Добавление наблюдения:</h3>
          <p className="leading-7 mb-6">
            Введите название наблюдения:
          </p>
          <Autocomplete
            className="w-72 text-slate-100"
            freeSolo
            autoFocus={true}
            options={titles}
            value={selectedTitle}
            onChange={(event, newValue) => {
              if (newValue && !titles.some((title) => title === newValue)) {
                handleAddTitle(newValue);
              } else {
                setSelectedTitle(newValue);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Название наблюдения"
                variant="outlined"
              />
            )}
          />
          {/* <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <p className="leading-7 mb-6">
                  Введите название наблюдения:
                </p>
                <FormControl>
                  <Input className='w-72' type="text" placeholder="Название наблюдения" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <p className="leading-7 mb-6">
                  Введите описание наблюдения:
                </p>
                <FormControl>
                  <Input className='w-72' type="text" placeholder="Описание наблюдения" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">

            <p className="leading-7 mb-6 w-52">
              Выберите дату:
            </p>


            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Дата</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}

                />
              </PopoverContent>
            </Popover>
          </div>

          {
            !astronomers ? <p className="leading-7 mb-6">
              Загрузка
            </p> : (<DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button className="w-72" variant="outline">{!pickedAstronomer ? "Выберите астронома" : `${astronomers.find(astronomer => astronomer.id == pickedAstronomer)?.name}`}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72">
                <DropdownMenuLabel>Список астрономов</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={pickedAstronomer} onValueChange={setPickedAstronomer}>

                  <div className="flex flex-col h-64 overflow-y-scroll">
                    {
                      astronomers.map(astronomer =>
                        <DropdownMenuRadioItem value={astronomer.id}>{astronomer.name} </DropdownMenuRadioItem>

                      )
                    }
                  </div>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>

            </DropdownMenu>)
          }


          {
            !observatories ? <p className="leading-7 mb-6">
              Загрузка
            </p> : (<DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button className="w-72" variant="outline">{!pickedObservatory ? "Выберите обсерваторию" : `${observatories.find(observatory => observatory.id == pickedObservatory)?.name}`}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72">
                <DropdownMenuLabel>Список обсерваториев</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={pickedObservatory} onValueChange={setPickedObservatory}>

                  <div className="flex flex-col h-64 overflow-y-scroll">
                    {
                      observatories.map(observatory =>
                        <DropdownMenuRadioItem value={observatory.id}>{observatory.name} </DropdownMenuRadioItem>

                      )
                    }
                  </div>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>

            </DropdownMenu>)
          }



          <Button type="submit" className='w-full'>Добавить наблюдение</Button>
        </form>
      </Form>

    </div>
  );
}
