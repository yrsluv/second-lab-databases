import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24 pt-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        Астрономическая картинка дня
      </h1>
     <div className="flex flex-wrap w-6/12 pl-3">

      <Link href='/today/27-09-2024' className="flex flex-col w-2/6 gap-0.5 pr-3 pb-3 ">
      <img src="/27-09-2024.png" className="rounded-[2px]" />
        <p className="text-xl font-semibold text-center">Звездные потоки в местной Вселенной</p>
        <p className="text-lg text-gray-500 text-center">27.09.2024</p>
      </Link>

      <Link href='/today/26-09-2024' className="flex flex-col w-2/6 gap-0.5 pr-3 pb-3">
      <img src="/26-09-2024.jpg" className="rounded-[2px]" />
        <p className="text-xl font-semibold text-center">Огромное шаровое скопление в Геркулесе</p>
        <p className="text-lg text-gray-500 text-center">26.09.2024</p>
      </Link>
      
      <Link href='/today/25-09-2024' className="flex flex-col w-2/6 gap-0.5 pr-3 pb-3">
      <img src="/25-09-2024.jpg" className="rounded-[2px]" />
        <p className="text-xl font-semibold text-center">Комета A3 над Австралией на рассвете</p>
        <p className="text-lg text-gray-500 text-center">25.09.2024</p>
      </Link>
      
      <Link href='/today/24-09-2024' className="flex flex-col w-2/6 gap-0.5 pr-3 pb-3">
      <img src="/24-09-2024.jpg" className="rounded-[2px]" />
        <p className="text-xl font-semibold text-center">NGC 6727: туманность Буйный Павиан</p>
        <p className="text-lg text-gray-500 text-center">24.09.2024</p>
      </Link>
      
      <Link href='/today/23-09-2024' className="flex flex-col w-2/6 gap-0.5 pr-3 pb-3">
      <img src="/23-09-2024.jpg" className="rounded-[2px]" />
        <p className="text-xl font-semibold text-center">Комета Цзыцзиньшань-ATLAS приближается</p>
        <p className="text-lg text-gray-500 text-center">23.09.2024</p>
      </Link>
      
      <Link href='/today/22-09-2024' className="flex flex-col w-2/6 gap-0.5 pr-3 pb-3">
      <img src="/22-09-2024.jpg" className="rounded-[2px]" />
        <p className="text-xl font-semibold text-center">Чикагохендж: равноденствие в упорядоченном городе</p>
        <p className="text-lg text-gray-500 text-center">22.09.2024</p>
      </Link>
      
      <Link href='/today/21-09-2024' className="flex flex-col w-2/6 gap-0.5 pr-3 pb-3">
      <img src="/21-09-2024.jpg" className="rounded-[2px]" />
        <p className="text-xl font-semibold text-center">Тени от восходящего Солнца на небе</p>
        <p className="text-lg text-gray-500 text-center">21.09.2024</p>
      </Link>
      
      <Link href='/today/20-09-2024' className="flex flex-col w-2/6 gap-0.5 pr-3 pb-3">
      <img src="/20-09-2024.png" className="rounded-[2px]" />
        <p className="text-xl font-semibold text-center">Урожайная Луна в тумане</p>
        <p className="text-lg text-gray-500 text-center">20.09.2024</p>
      </Link>
      
      <Link href='/today/19-09-2024' className="flex flex-col w-2/6 gap-0.5 pr-3 pb-3">
      <img src="/19-09-2024.jpg" className="rounded-[2px]" />
        <p className="text-xl font-semibold text-center">Темный Морской конек в Цефее
</p>
        <p className="text-lg text-gray-500 text-center">19.09.2024</p>
      </Link>
      
      <Link href='/today/18-09-2024' className="flex flex-col w-2/6 gap-0.5 pr-3 pb-3">
      <img src="/18-09-2024.jpg" className="rounded-[2px]" />
        <p className="text-xl font-semibold text-center">Остаток сверхновой туманность Русалка</p>
        <p className="text-lg text-gray-500 text-center">18.09.2024</p>
      </Link>

     </div>

    </main>
  );
}
