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

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { CountryPicker } from "@/components/countryPicker"





const countrySchema = z.object({
    name: z.string(),
    description: z.string(),
    longitude: z.string().refine((val) => {
        const parsed = parseFloat(val);
        return !isNaN(parsed) && isFinite(parsed);
    }, "Неправильный формат",
    ),
    latitude: z.string().refine((val) => {
        const parsed = parseFloat(val);
        return !isNaN(parsed) && isFinite(parsed);
    }, "Неправильный формат",
    ),
    date: z.string(),
    workers: z.string()
        .transform((year) => parseInt(year))
        .superRefine((year, ctx) => {
            if (isNaN(year)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Похоже, что введено неподходящее число",
                });
            }
        })
        .pipe(z.number().max(100, "Похоже, что число слишком большое"))
        .transform((year) => year.toString()),
});

export const ObservatoryModal = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [date, setDate] = useState(null);
    const [pickedCountry, setPickedCountry] = useState(null)
    const [success, setSuccess] = useState(null);


    const observatoryForm = useForm({
        resolver: zodResolver(countrySchema),
        defaultValues: {
            name: "",
            description: '',
            longitude: '',
            latitude: '',
            date: '',
            workers: '',
        },
    })

    async function onObservatorySubmit(values) {
        if (!date || !pickedCountry) return;
        try {
            const response = await fetch('/api/observatory', {
                method: "POST",
                body: JSON.stringify({
                    name: values.name,
                    description: values.description,
                    country: +pickedCountry,
                    longitude: values.longitude,
                    latitude: values.latitude,
                    date: date.toISOString(),
                    workers: values.workers,
                })
            });
            if (!response.ok) {
                throw new Error('Произошла непредвиденная ошибка');
            }
            const data = await response.json();
            setLoading(false);
            console.log(data)
            setSuccess(data.success);
            observatoryForm.reset();
            setPickedCountry(null);
            setDate(null);
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } catch (error) {
            setError('Произошла непредвиденная ошибка');
            setLoading(false);
        }
    }

    return (
        <Form {...observatoryForm}>
            <form onSubmit={observatoryForm.handleSubmit(onObservatorySubmit)} className="space-y-8 flex flex-col items-center mt-4">
                {
                    success && <p className="leading-7 [&:not(:first-child)]:mt-6 text-green-400">
                        Новая обсерватория успешно создана
                    </p>
                }
                <FormField
                    control={observatoryForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <p classNamde="leading-7 mb-6">
                                Введите название обсерватории:
                            </p>
                            <FormControl>
                                <Input className='w-80' type="text" placeholder="Название обсерватории" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={observatoryForm.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <p classNamde="leading-7 mb-6">
                                Введите описание обсерватории:
                            </p>
                            <FormControl>
                                <Input className='w-80' type="text" placeholder="Описание обсерватории" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={observatoryForm.control}
                    name="latitude"
                    render={({ field }) => (
                        <FormItem>
                            <p classNamde="leading-7 mb-6">
                                Введите широту обсерватории:
                            </p>
                            <FormControl>
                                <Input className='w-80' type="text" placeholder="Широта обсерватории" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={observatoryForm.control}
                    name="longitude"
                    render={({ field }) => (
                        <FormItem>
                            <p classNamde="leading-7 mb-6">
                                Введите долготу обсерватории:
                            </p>
                            <FormControl>
                                <Input className='w-80' type="text" placeholder="Долгота обсерватории" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}

                />
                <FormField
                    control={observatoryForm.control}
                    name="workers"
                    render={({ field }) => (
                        <FormItem>
                            <p classNamde="leading-7 mb-6">
                                Введите колличество рабочих обсерватории:
                            </p>
                            <FormControl>
                                <Input className='w-80' type="text" placeholder="Колличество рабочих обсерватории" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="space-y-2">

                    <p className="leading-7 mb-6 w-80">
                        Выберите страну:
                    </p>

                    <CountryPicker value={pickedCountry} onValueChange={setPickedCountry} />
                </div>


                <div className="space-y-2">

                    <p className="leading-7 mb-6 w-80">
                        Выберите дату:
                    </p>


                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-80 justify-start text-left font-normal",
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

                <Button type="submit" className='w-6/12'>Добавить обсерваторию</Button>

            </form>
        </Form>
    );
};