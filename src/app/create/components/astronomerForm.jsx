'use client'


import { CountryPicker } from "@/components/countryPicker"
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
import { useState } from "react"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


const schema = z.object({
    name: z.string(),
    biography: z.string(),
});



export const AstronomerForm = () => {
    const [pickedCountry, setPickedCountry] = useState(null)
    const [date, setDate] = useState(null);
    const [success, setSuccess] = useState(null);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            biography: "",
        },
    })

    async function onSubmit(values) {
        console.log(date, pickedCountry)
        if (!date || !pickedCountry) return;
        try {
            console.log(1)
            const resp = await fetch('/api/astronomer', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: values.name,
                    biography: values.biography,
                    birthday: date.toISOString(), // Fixed method name
                    countryId: +pickedCountry,
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


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center mt-4">
                {
                    success && <p className="leading-7 [&:not(:first-child)]:mt-6 text-green-400">
                        Новый астроном успешно создан
                    </p>
                }
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className='w-72'>
                            <p className="leading-7 mb-6">
                                Введите имя астронома:
                            </p>
                            <FormControl>
                                <Input className='w-full' type="text" placeholder="Имя астронома" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="biography"
                    render={({ field }) => (
                        <FormItem className='w-72'>
                            <p className="leading-7 mb-6">
                                Введите биографию астронома:
                            </p>
                            <FormControl>
                                <Input className='w-full' type="text" placeholder="Биография астронома" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <></>
                    )}
                />

                <div className="space-y-2">

                    <p className="leading-7 mb-6 w-72">
                        Выберите страну:
                    </p>

                    <CountryPicker value={pickedCountry} onValueChange={setPickedCountry} />
                </div>

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

                <Button type="submit" className='w-6/12'>Добавить астронома</Button>

            </form>
        </Form>
    );
};