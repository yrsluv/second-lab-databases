'use client'
import Link from "next/link";
import Script from "next/script";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24 pt-12 flex-auto">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        Виджеты
      </h1>
    <p className="text-lg">Виджет - конвертер валют, позволяет сконверитровать любые валюты, изначальна отображает текущий курс Биткоина</p>
    <Script async src="https://s.fx-w.io/widgets/currency-converter/latest.js"></Script>
    <fxwidget-cc amount="1" decimals="2" large="false" shadow="true" symbol="true" grouping="true" border="true" from="BTC" to="RUB" background-color="#89cff0" lang="ru"></fxwidget-cc><Script async src="https://s.fx-w.io/widgets/currency-converter/latest.js?ru"></Script>

    <p className="text-lg">Виджет - погода, отображает текущую погоду в Обнинске</p>


    <div id="_MI_1902d2a055fa7e18cc4458d15a1f2b9b"><a href="https://ru.meteotrend.com/">Прогноз погоды</a></div> <Script type='text/javascript'>{`(function(d,w,t,k){function l(){if(typeof(w._MIOB_)=='undefined'){w._MIOB_={};}var m=w._MIOB_[t]=k;var s=d.createElement('script');m.p=('https:'==d.location.protocol?'https:':'http:');s.type='text/javascript';s.async=true;s.src=m.p+'//info.meteotrend.com/mt/'+m.t+'.js';d.body.appendChild(s);}if(d.readyState=='complete')l();else{if(w.attachEvent)w.attachEvent('onload',l);else w.addEventListener('load',l,false);}})(document,window,'1902d2a055fa7e18cc4458d15a1f2b9b',{t:'4x6',sw:{"pname":1,"ccond":1,"ccdesc":1,"dayblock":1,"tblank":1},css:['{p}//info.meteotrend.com/mt/{t}.css','{p}//info.meteotrend.com/cs/d2e6236505ff2d231f9b6db9e1a56828f5a82206.css'],source:'meteotrend'});`}</Script>


    <p className="text-lg">Виджет - часы, отображает текущее Московское время</p>

    <iframe className="bg-white flex items-center justify-center"  frameborder="no" scrolling="no" width="280" height="150" src="https://yandex.ru/time/widget/?geoid=213&lang=ru&layout=horiz&type=analog&face=serif"></iframe>

    <p className="text-lg">Виджет - календарь, отображает календарь на текущий месяц и позволяет создавать новые события</p>

<iframe
    src="https://calendar.google.com/calendar/embed?src=df28c2b4c9ca8565956125b5ee284b68967c8c9a8ece4e3f8564589e3f32c9f0%40group.calendar.google.com&ctz=Europe%2FMinsk"
    style={{ border: 0, width: 800, height: 600, frameborder: 0, scrolling: 'no' }}
  />

    <p className="text-lg">Виджет - карта, отображает местоположения ИАТЭ на яндекс карте</p>


<div style={{ position: 'relative', overflow: 'hidden' }}>
    <a
      href="https://yandex.ru/maps/org/obninskiy_institut_atomnoy_energetiki_niyau_mifi/206833913929/?utm_medium=mapframe&utm_source=maps"
      style={{ color: '#eee', fontSize: 12, position: 'absolute', top: 0 }}
    >
      Обнинский институт атомной энергетики НИЯУ МИФИ
    </a>
    <a
      href="https://yandex.ru/maps/967/obninsk/category/university/184106140/?utm_medium=mapframe&utm_source=maps"
      style={{ color: '#eee', fontSize: 12, position: 'absolute', top: 14 }}
    >
      ВУЗ в Обнинске
    </a>
    <iframe
      src="https://yandex.ru/map-widget/v1/?ll=36.607189%2C55.137391&mode=poi&poi%5Bpoint%5D=36.606741%2C55.137308&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D206833913929&z=16.82"
      width={560}
      height={400}
      frameborder={1}
      allowfullscreen
      style={{ position: 'relative' }}
    />
  </div>



    </main>
  );
}
