'use client'

import { useEffect } from 'react';

const YandexSearch = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//site.yandex.net/v2.0/js/all.js';
    script.async = true;
    script.charset = 'utf-8';
    document.body.appendChild(script);

    document.documentElement.classList.add('ya-page_js_yes');

    window.yandex_site_callbacks = window.yandex_site_callbacks || [];
    window.yandex_site_callbacks.push(function () {
      window.Ya.Site.Form.init();
    });

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="ya-site-form ya-site-form_inited_no" data-bem='{"action":"https://yandex.ru/search/site/","arrow":true,"bg":"#0000cc","fontsize":16,"fg":"#000000","language":"ru","logo":"rb","publicname":"Yandex Site Search #10674186","suggest":true,"target":"_self","tld":"ru","type":2,"usebigdictionary":true,"searchid":10674186,"input_fg":"#000000","input_bg":"#ffffff","input_fontStyle":"normal","input_fontWeight":"bold","input_placeholder":null,"input_placeholderColor":"#000000","input_borderColor":"#7f9db9"}'>
      <form action="https://yandex.ru/search/site/" method="get" target="_self" acceptCharset="utf-8">
        <input type="hidden" name="searchid" value="10674186" />
        <input type="hidden" name="l10n" value="ru" />
        <input type="hidden" name="reqenc" value="" />
        <input type="search" name="text" defaultValue="" />
        <input type="submit" value="Найти" />
      </form>
      <style jsx>{`
        .ya-page_js_yes .ya-site-form_inited_no {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default YandexSearch;