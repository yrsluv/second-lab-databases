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
import React from "react";
import { cn } from "@/lib/utils"


export const Header = () => {
    return (
        <NavigationMenu className='mt-2'>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Главная
                        </NavigationMenuLink>
                    </Link>
                    <Link href="/create" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Добавление наблюдений
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Поиск</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="flex flex-col gap-3 p-6 md:w-[400px] lg:w-[500px] ">
                            <ListItem href="/workers" title="По одному атрибуту">
                                Поиск Обсерваторий по атрибуту "число рабочих"
                            </ListItem>
                            <ListItem href="/observations" title="По двум атрибутам">
                                Поиск Астрономических наблюдений по двум атрибутам: "год наблюдения" и "страна Астронома"
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem> <Link href="/stats" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Статистика
                    </NavigationMenuLink>
                </Link></NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

