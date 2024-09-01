export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24 pt-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        База данных "Астрономические наблюдения"
      </h1>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight w-6/12">
        Используемые технологии:
        <ul className="my-6 ml-6 mb-0 list-disc [&>li]:mt-2">
          <li>СУБД - PostgresSQL</li>
          <li>Сервер - Node.js</li>
          <li>Клиент - React.js</li>
          <li>Стили - Tailwind.css</li>
        </ul>
      </h4>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight w-6/12">
        Источниками информации являются заинтересованные организации
        (государственные и коммерческие), которые собирают различные данные об
        астрономических событиях и хотят поместить о них информацию для доступа к
        ним заинтересованных лиц.
      </h4>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight w-6/12">
        Источники данных:
        <ul className="my-6 ml-6 mb-0 list-disc [&>li]:mt-2">
          <li>NASA&#39;s Astrophysics Data System (ADS)</li>
          <li>The International Astronomical Union (IAU) databases</li>
          <li>The European Space Agency (ESA) databases</li>
        </ul>
      </h4>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight w-6/12">
        <ul className="my-6 ml-0 list-disc [&>li]:mt-2">
          <p className="mb-4">Выполнил - Студент ИВТ1-Б21 Бахтин Ярослав</p>
          <p>Преподователь - Евгений Дмитриевич Вязилов,

            д.т.н., зав.лаб. ЦОД ФГБУ «ВНИИГМИ-МЦД», <br />

            проф. Отделения интеллектуальных кибернетических систем Обнинского ИАТЭ, филиал НИЯУ МИФИ</p>
        </ul>
      </h4>

    </main>
  );
}
