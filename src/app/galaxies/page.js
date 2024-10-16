import Image from 'next/image';

export default function Galaxies() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Галактики</h1>
      
      <section className="mb-12">
        <p className="text-lg ">
          Галактики — это огромные системы, состоящие из звезд, планет, газа, пыли и темной материи, связанных гравитацией. В каждой галактике могут находиться миллиарды или даже триллионы звезд. 
          Галактики играют важную роль в эволюции Вселенной, формируя структуру космоса. Вот несколько фактов о галактиках, которые делают их столь уникальными:
        </p>
        
        <ul className="list-disc list-inside mt-4 ">
          <li>Они бывают различных типов, включая спиральные, эллиптические и неправильные.</li>
          <li>Существует более 2 триллионов галактик во Вселенной.</li>
          <li>Галактика, в которой мы живем, называется Млечный Путь.</li>
        </ul>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Типы галактик</h2>
        <p className="text-lg  mb-4">Галактики классифицируются по форме и структуре. Существуют три основных типа галактик:</p>
        
        <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Спиральные галактики</h3>
        <p className="text-lg  mb-4">
          Спиральные галактики, такие как Млечный Путь, имеют яркое ядро и спиральные рукава, состоящие из звезд и газа. Эти галактики часто имеют активные процессы звездообразования.
        </p>
        <div className="mb-8">
          <Image
            src="/images/spiral-galaxy.jpg"
            alt="Спиральная галактика"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        
        <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Эллиптические галактики</h3>
        <p className="text-lg  mb-4">
          Эллиптические галактики имеют форму эллипса и состоят преимущественно из старых звезд. В таких галактиках мало газа и пыли, поэтому процесс звездообразования почти не происходит.
        </p>
        <div className="mb-8">
          <Image
            src="/images/elliptical-galaxy.jpg"
            alt="Эллиптическая галактика"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        
        <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Неправильные галактики</h3>
        <p className="text-lg  mb-4">
          Неправильные галактики не имеют четкой структуры и формы. Они обычно небольшие и могут содержать как молодые, так и старые звезды. Примером может служить Магеллановы Облака, которые являются спутниками Млечного Пути.
        </p>
        <div className="mb-8">
          <Image
            src="/images/irregular-galaxy.jpg"
            alt="Неправильная галактика"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Млечный Путь</h2>
        <p className="text-lg  mb-4">
          Млечный Путь — это спиральная галактика, в которой находится наша Солнечная система. Диаметр галактики составляет около 100 000 световых лет, и в ней содержится от 100 до 400 миллиардов звезд. 
          Мы находимся на периферии одного из спиральных рукавов, называемого рукавом Ориона.
        </p>
        <div className="mb-8">
          <Image
            src="/images/milky-way.webp"
            alt="Млечный Путь"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Другие известные галактики</h2>
        <ul className="list-disc list-inside text-lg ">
          <li><strong>Андромеда:</strong> ближайшая крупная галактика к Млечному Пути, которая находится на расстоянии около 2,5 миллионов световых лет.</li>
          <li><strong>Галактика Сомбреро:</strong> галактика, известная своей формой, напоминающей шляпу сомбреро, находится примерно в 28 миллионах световых лет от Земли.</li>
          <li><strong>Магеллановы Облака:</strong> две неправильные галактики-спутники Млечного Пути, видимые в южном полушарии.</li>
        </ul>
      </section>
        
    </div>
  );
}
