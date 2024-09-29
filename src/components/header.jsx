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
import Script from "next/script";


export const Header = () => {
    return (
        <NavigationMenu className='mt-2'>
            <Script type="text/javascript" >
{`   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(98490866, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });`}
</Script>
<noscript><div><img src="https://mc.yandex.ru/watch/98490866" style={{position: 'absolute', left: '-9999px'}} alt="" /></div></noscript>
  <a
    href="https://metrika.yandex.ru/stat/?id=98490866&amp;from=informer"
    target="_blank"
    rel="nofollow"
  >
    <img
      src="https://informer.yandex.ru/informer/98490866/3_1_FFFFFFFF_EFEFEFFF_0_pageviews"
      style={{ width: 88, height: 31, border: 0 }}
      alt="Яндекс.Метрика"
      title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)"
      className="ym-advanced-informer"
      data-cid="98490866"
      data-lang="ru"
    />
  </a>

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
                <NavigationMenuItem> <Link href="/today" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Космос сегодня
                    </NavigationMenuLink>
                </Link></NavigationMenuItem>
                   <NavigationMenuItem> <Link href="/widgets" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Виджеты
                    </NavigationMenuLink>
                </Link></NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

