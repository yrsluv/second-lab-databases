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


const countrySchema = z.object({
    value: z.string(),
    code: z.string().min(2, 'Слишком мало символов').max(3, 'Слишком много символов'),
});

export const CountryModal = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const countryForm = useForm({
        resolver: zodResolver(countrySchema),
        defaultValues: {
            value: "",
            code: ''
        },
    })

    async function onCountrySubmit(values) {
        console.log(values)
        try {
            const response = await fetch('/api/countries', {
                method: "POST",
                body: JSON.stringify({
                    value: values.value,
                    code: values.code
                })
            });
            if (!response.ok) {
                throw new Error('Произошла непредвиденная ошибка');
            }
            const data = await response.json();
            setLoading(false);
            setSuccess(data.success);
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } catch (error) {
            setError('Произошла непредвиденная ошибка');
            setLoading(false);
        }
    }

    return (
        <Form {...countryForm}>
            <form onSubmit={countryForm.handleSubmit(onCountrySubmit)} className="space-y-8 flex flex-col items-center mt-4">
                {
                    success && <p className="leading-7 [&:not(:first-child)]:mt-6 text-green-400">
                        Новая страна успешно создана
                    </p>
                }
                <FormField
                    control={countryForm.control}
                    name="value"
                    render={({ field }) => (
                        <FormItem>
                            <p className="leading-7 mb-6">
                                Введите название старны:
                            </p>
                            <FormControl>
                                <Input className='w-full' type="text" placeholder="Название страны" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={countryForm.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <p className="leading-7 mb-6">
                                Введите код страны:
                            </p>
                            <FormControl>
                                <Input className='w-full' type="text" placeholder="Код страны" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='w-6/12'>Добавить страну</Button>

            </form>
        </Form>
    );
};