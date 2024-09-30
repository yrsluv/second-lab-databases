import Script from "next/script"

export const Footer = () => {
    return (
    <footer className="bg-primary w-full flex items-center justify-center mt-4">            
    <div className="max-w-max flex gap-4 py-4">
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
    <p className="text-xl">© 2024 Бахтин Я.В. ⠀| yrslvvvv@gmail.com |⠀ ИВТ-Б21 ⠀|⠀ ИАТЭ НИЯУ МИФИ</p>
    </div>
  </footer>
  )
}