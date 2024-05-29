'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"


export const CountryPicker = ({ value, onValueChange }) => {
    const [countries, setCountries] = useState(null);

    async function fetchCountries(number) {
        try {
            const response = await fetch('/api/countries');
            if (!response.ok) {
                throw new Error('Произошла непредвиденная ошибка');
            }
            const data = await response.json();
            setCountries(data.data);
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        fetchCountries();
    }, [])

    return (
        <>
            {
                !countries ? <p className="leading-7 mb-6">
                    Загрузка
                </p> : (<DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className='w-full'>{!value ? "Выберите страну" : `${countries.find(country => country.id == value)?.value}`}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Список стран</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>

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
        </>
    );
};