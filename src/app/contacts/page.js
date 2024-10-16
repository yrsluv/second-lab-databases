import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-2 p-24 pt-12">

      <h1 className="text-4xl font-bold text-center mb-8">Контакты</h1>
            <Image
            src="/images/me.jpg"
            alt="ya"
            width={400}
            height={400}
            className="rounded-full"
          />
          <p className="text-lg font-bold mb-1">Разработчик сайта - Бахтин Ярослав</p>
          <p className="text-lg font-bold mb-1">почта - <Link href='mailto:yrslvvvv@gmail.com' target="_blank" className="text-indigo-600">yrslvvvv@gmail.com</Link></p>

    </main>
  );
}
