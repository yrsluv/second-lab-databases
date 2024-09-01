import { Header } from "@/components/header";
import "./globals.css";


export const metadata = {
  title: "БД Астрономических наблюдений",
  description: "Созданно в рамках курса предмета 'Базы данных' ",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="dark flex w-full items-center justify-center flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
