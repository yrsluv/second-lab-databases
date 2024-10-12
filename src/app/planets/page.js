import Image from 'next/image';

export default function Planets() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Планеты</h1>
      
      <section className="mb-12">
        <p className="text-lg ">
          Солнечная система включает в себя восемь планет, каждая из которых уникальна по своим характеристикам. Планеты вращаются вокруг Солнца, нашей центральной звезды, и классифицируются на два типа: земные планеты и газовые гиганты.
        </p>
        <ul className="list-disc list-inside mt-4 ">
          <li><strong>Земные планеты:</strong> Меркурий, Венера, Земля, Марс.</li>
          <li><strong>Газовые гиганты:</strong> Юпитер, Сатурн, Уран, Нептун.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Меркурий</h2>
        <div className="flex flex-col md:flex-row items-center">
          <Image
            src="/images/mercury.webp"
            alt="Меркурий"
            width={300}
            height={300}
            className="rounded-lg shadow-lg mb-4 md:mb-0 md:mr-6"
          />
          <p className="text-lg ">
            Меркурий — ближайшая к Солнцу планета, известная своей экстремальной температурой. Днем температура на поверхности достигает 430°C, а ночью падает до -180°C. У Меркурия нет атмосферы, и он покрыт кратерами, как наша Луна.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Венера</h2>
        <div className="flex flex-col md:flex-row items-center">
          <Image
            src="/images/venus.jpg"
            alt="Венера"
            width={300}
            height={300}
            className="rounded-lg shadow-lg mb-4 md:mb-0 md:mr-6"
          />
          <p className="text-lg ">
            Венера — вторая планета от Солнца и самая горячая планета в Солнечной системе. Ее плотная атмосфера, состоящая из углекислого газа, создает парниковый эффект, из-за чего температура на поверхности достигает 470°C.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Земля</h2>
        <div className="flex flex-col md:flex-row items-center">
          <Image
            src="/images/earth.webp"
            alt="Земля"
            width={300}
            height={300}
            className="rounded-lg shadow-lg mb-4 md:mb-0 md:mr-6"
          />
          <p className="text-lg ">
            Земля — третья планета от Солнца и единственная, на которой известна жизнь. Она имеет атмосферу, богатую кислородом, и разнообразный климат. Земля покрыта океанами, которые занимают более 70% поверхности планеты.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Марс</h2>
        <div className="flex flex-col md:flex-row items-center">
          <Image
            src="/images/mars.webp"
            alt="Марс"
            width={300}
            height={300}
            className="rounded-lg shadow-lg mb-4 md:mb-0 md:mr-6"
          />
          <p className="text-lg ">
            Марс, известный как "Красная планета", имеет тонкую атмосферу и суровые условия. Поверхность покрыта железным оксидом, придающим планете красный цвет. Учёные активно исследуют возможность наличия воды и, возможно, жизни на Марсе в прошлом.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Юпитер</h2>
        <div className="flex flex-col md:flex-row items-center">
          <Image
            src="/images/jupiter.webp"
            alt="Юпитер"
            width={300}
            height={300}
            className="rounded-lg shadow-lg mb-4 md:mb-0 md:mr-6"
          />
          <p className="text-lg ">
            Юпитер — самая большая планета Солнечной системы. Это газовый гигант, известный своим "Большим Красным Пятном" — огромным штормом, который продолжается сотни лет. Юпитер также имеет множество спутников, включая знаменитый Ио и Европу.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Сатурн</h2>
        <div className="flex flex-col md:flex-row items-center">
          <Image
            src="/images/saturn.jpg"
            alt="Сатурн"
            width={300}
            height={300}
            className="rounded-lg shadow-lg mb-4 md:mb-0 md:mr-6"
          />
          <p className="text-lg ">
            Сатурн известен своими ярко выраженными кольцами, состоящими из льда и пыли. Это вторая по величине планета в Солнечной системе. Хотя Сатурн — газовый гигант, на нем есть необычные погодные явления, такие как шестиугольный шторм на северном полюсе.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Уран</h2>
        <div className="flex flex-col md:flex-row items-center">
          <Image
            src="/images/uranus.png"
            alt="Уран"
            width={300}
            height={300}
            className="rounded-lg shadow-lg mb-4 md:mb-0 md:mr-6"
          />
          <p className="text-lg ">
            Уран — ледяной гигант, который вращается на боку относительно своей орбиты. Уран имеет необычную голубовато-зеленую окраску из-за метана в атмосфере. Его температура может опускаться до -224°C, что делает его самой холодной планетой.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Нептун</h2>
        <div className="flex flex-col md:flex-row items-center">
          <Image
            src="/images/neptune.webp"
            alt="Нептун"
            width={300}
            height={300}
            className="rounded-lg shadow-lg mb-4 md:mb-0 md:mr-6"
          />
          <p className="text-lg ">
            Нептун — самая дальняя планета Солнечной системы. Он известен своими сильными ветрами, которые могут достигать 2000 км/ч. Нептун имеет темно-синюю окраску и также является ледяным гигантом, подобно Урану.
          </p>
        </div>
      </section>
    </div>
  );
}
