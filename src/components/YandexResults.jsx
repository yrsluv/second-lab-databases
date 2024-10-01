'use client'
import { useEffect } from 'react';

const YandexSearchResults = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.charset = 'utf-8';
    script.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//site.yandex.net/v2.0/js/all.js';
    
    const scriptTag = document.getElementsByTagName('script')[0];
    scriptTag.parentNode.insertBefore(script, scriptTag);
    
    window.yandex_site_callbacks = window.yandex_site_callbacks || [];
    window.yandex_site_callbacks.push(() => {
      if (window.Ya && window.Ya.Site && window.Ya.Site.Results) {
        window.Ya.Site.Results.init();
      }
    });

    return () => {
      scriptTag.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div
      id="ya-site-results"
      data-bem='{ "tld": "ru", "language": "ru", "encoding": "", "htmlcss": "1.x", "updatehash": false }'
    />
  );
};

export default YandexSearchResults;
