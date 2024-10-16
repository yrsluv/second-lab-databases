'use client'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
    ListItem
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils"
import Script from "next/script";
import YandexSearch from "./YandexSearch";


export const Header = () => {

    const [user, setUser] = useState(typeof localStorage !== 'undefined' ? localStorage?.getItem('user') : '');

    useEffect(() => {

        const onAuth = () => {
            setUser(localStorage?.getItem('user') ?? '');
        }
        window.addEventListener('auth', onAuth)

        return () => window.removeEventListener('auth', onAuth)
    },[])

    



    return (
       <div className="flex flex-col items-center">
        <p className="text-center text-2xl md:text-4xl font-bold pt-4">Астрономические наблюдения</p>
         <NavigationMenu className='mt-2 max-h-max flex flex-wrap' id='nav'>
            <NavigationMenuList className='flex px-10'>
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Главная
                        </NavigationMenuLink>
                    </Link>
                    {/* <Link href="/create" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Добавление наблюдений
                        </NavigationMenuLink>
                    </Link> */}
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger aria-controls="nav">База данных</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="flex flex-col gap-3 p-6 md:w-[400px] lg:w-[500px] ">
                            <ListItem href="/create" title="Добавление наблюдений"></ListItem>
                            <ListItem href="/stats" title="Статистика"></ListItem>
                            <ListItem href="/workers" title="Поиск по одному атрибуту"></ListItem>
                                <ListItem href="/observations" title="Поиск по двум атрибутам"></ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                {/* <NavigationMenuItem> <Link href="/stats" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Статистика
                    </NavigationMenuLink>
                </Link></NavigationMenuItem> */}
                {/* <NavigationMenuItem> <Link href="/today" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Астрономическая картинка дня
                    </NavigationMenuLink>
                </Link></NavigationMenuItem> */}
                 <NavigationMenuItem>
                    <NavigationMenuTrigger aria-controls="nav">Информация о космосе</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="flex flex-col gap-3 p-6 md:w-[400px] lg:w-[500px] ">
                            <ListItem href="/galaxies" title="Галактики"></ListItem>
                            <ListItem href="/planets" title="Планеты"></ListItem>
                            <ListItem href="/stars" title="Звёзды"></ListItem>
                            <ListItem href="/blackholes" title="Чёрные дыры"></ListItem>
                            <ListItem href="/race" title="Космическая гонка"></ListItem>
                            <ListItem href="/observatories" title="Обсерватории"></ListItem>
                            <ListItem href="/telescopes" title="Телескопы"></ListItem>
                           
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                {/* <NavigationMenuItem> <Link href="/galaxies" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Галактики
                    </NavigationMenuLink>
                </Link></NavigationMenuItem>
                <NavigationMenuItem> <Link href="/planets" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Планеты
                    </NavigationMenuLink>
                </Link></NavigationMenuItem>
                <NavigationMenuItem> <Link href="/stars" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Звёзды
                    </NavigationMenuLink>
                </Link></NavigationMenuItem>
                <NavigationMenuItem> <Link href="/blackholes" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Чёрные дыры
                    </NavigationMenuLink>
                </Link></NavigationMenuItem>
                 <NavigationMenuItem> <Link href="/race" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Космическая гонка
                    </NavigationMenuLink>
                </Link></NavigationMenuItem>

                <NavigationMenuItem> <Link href="/observatories" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Обсерватории
                    </NavigationMenuLink>
                </Link></NavigationMenuItem>


                <NavigationMenuItem> <Link href="/telescopes" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Телескопы
                    </NavigationMenuLink>
                </Link></NavigationMenuItem> */}

                <NavigationMenuItem> <Link href="/contacts" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                       Контакты
                    </NavigationMenuLink>
                </Link></NavigationMenuItem>

                   <NavigationMenuItem> <Link href="/widgets" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Виджеты
                    </NavigationMenuLink>
                </Link></NavigationMenuItem>

                <NavigationMenuItem> <Link href="/xml" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        XML
                    </NavigationMenuLink>
                </Link></NavigationMenuItem>

                <NavigationMenuItem> <Link href="/rss" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        RSS
                    </NavigationMenuLink>
                </Link></NavigationMenuItem>
                <div className="flex gap-2 items-center md:text-sm text-xs !text-[10px] md:!text-[16px] font-bold">
                    {
                    user ? <p>{user}</p> : <Link href={'/register'}>Регистрация</Link>
                }
                {
                    user ? <button onClick={() => {localStorage.removeItem('user'); setUser(''); }}>Выход</button> : <Link href={'/login'}>Вход</Link>
                }
                </div>
            </NavigationMenuList>
        </NavigationMenu>
        <YandexSearch />

       </div>
    );
};

