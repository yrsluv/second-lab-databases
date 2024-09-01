const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const countries = [];
  const countryNames = [
    'Соединенные Штаты', 'Канада', 'Германия', 'Франция', 'Австралия', 'Япония', 'Китай', 'Бразилия', 'Индия', 'Россия',
    'Великобритания', 'Италия', 'Испания', 'Мексика', 'Южная Корея', 'Турция', 'Нидерланды', 'Саудовская Аравия', 'Швеция', 'Швейцария',
    'Аргентина', 'Бельгия', 'Норвегия', 'Польша', 'Южно-Африканская Республика', 'Индонезия', 'Таиланд', 'Филиппины', 'Вьетнам', 'Египет',
    'Пакистан', 'Бангладеш', 'Нигерия', 'Колумбия', 'Малайзия', 'Чили', 'Украина', 'Румыния', 'Австрия', 'Греция',
    'Португалия', 'Венгрия', 'Чешская Республика', 'Израиль', 'Сингапур', 'Гонконг', 'Ирландия', 'Новая Зеландия', 'Дания', 'Финляндия'
  ];    
  const countryCodes = [
    'US', 'CA', 'DE', 'FR', 'AU', 'JP', 'CN', 'BR', 'IN', 'RU',
    'GB', 'IT', 'ES', 'MX', 'KR', 'TR', 'NL', 'SA', 'SE', 'CH',
    'AR', 'BE', 'NO', 'PL', 'ZA', 'ID', 'TH', 'PH', 'VN', 'EG',
    'PK', 'BD', 'NG', 'CO', 'MY', 'CL', 'UA', 'RO', 'AT', 'GR',
    'PT', 'HU', 'CZ', 'IL', 'SG', 'HK', 'IE', 'NZ', 'DK', 'FI'
];
  for (let i = 0; i < 50; i++) {
    const country = await prisma.country.create({
      data: {
        code: countryCodes[i],
        value: countryNames[i]
      }
    });
    countries.push(country);
  }

  const coordinateSystems = [];
  const coordinatesSystemId = []
  const coordinateSystemsCodes = ['ICRS', 'ECL'];
  const coordinateSystemNames = ['Международная небесная система координат', 'Эклиптическая система координат'];
  for (let i = 0; i < 2; i++) {
    const coordinateSystem = await prisma.coordinateSystem.create({
      data: {
        code: coordinateSystemsCodes[i],
        value: coordinateSystemNames[i]
      }
    });
    coordinateSystems.push(coordinateSystem);
    coordinatesSystemId.push(coordinateSystem.id);

  }



  // Create 10 CelestialBody records
  const celestialBodies = [];
  const bodies = [
    {
      code: 'SOL', value: 'Солнце',
      description: 'Звезда, центральное тело Солнечной системы',
      mass: 1.989e30, // в килограммах
      radius: 696340, // в километрах
      distanceFromEarth: 0 // Солнце находится в центре системы
    },
    {
      code: 'LUNA', value: 'Луна',
      description: 'Естественный спутник Земли',
      mass: 7.342e22, // в килограммах
      radius: 1737.4, // в километрах
      distanceFromEarth: 384400 // в километрах
    },
    {
      code: 'MERCURY', value: 'Меркурий',
      description: 'Первая планета от Солнца',
      mass: 3.3011e23, // в килограммах
      radius: 2439.7,  // в километрах
      distanceFromEarth: 91700000 // в километрах
    },
    {
      code: 'VENUS', value: 'Венера',
      description: 'Вторая планета от Солнца',
      mass: 4.8675e24, // в килограммах
      radius: 6051.8,  // в километрах
      distanceFromEarth: 41400000 // в километрах
    },
    {
      code: 'EARTH', value: 'Земля',
      description: 'Третья планета от Солнца, наш дом',
      mass: 5.97237e24, // в килограммах
      radius: 6371,     // в километрах
      distanceFromEarth: 0.0 // Земля находится у нас под ногами
    },
    {
      code: 'MARS', value: 'Марс',
      description: 'Четвертая планета от Солнца, известна как Красная планета',
      mass: 6.4171e23, // в килограммах
      radius: 3389.5,  // в километрах
      distanceFromEarth: 78000000 // в километрах
    },
    {
      code: 'JUPITER', value: 'Юпитер',
      description: 'Пятая планета от Солнца, крупнейшая планета в Солнечной системе',
      mass: 1.8982e27, // в килограммах
      radius: 69911,   // в километрах
      distanceFromEarth: 628730000 // в километрах
    },
    {
      code: 'SATURN', value: 'Сатурн',
      description: 'Шестая планета от Солнца, известна своими кольцами',
      mass: 5.6834e26, // в килограммах
      radius: 58232,   // в километрах
      distanceFromEarth: 1275000000 // в километрах
    },
    {
      code: 'URANUS', value: 'Уран',
      description: 'Седьмая планета от Солнца, ледяной гигант',
      mass: 8.6810e25, // в килограммах
      radius: 25362,   // в километрах
      distanceFromEarth: 2723950000 // в километрах
    },
    {
      code: 'NEPTUNE', value: 'Нептун',
      description: 'Восьмая планета от Солнца, ледяной гигант',
      mass: 1.02413e26, // в килограммах
      radius: 24622,    // в километрах
      distanceFromEarth: 4351400000 // в километрах
    },
    {
      code: 'PLUTO', value: 'Плутон',
      description: 'Карликовая планета в поясе Койпера',
      mass: 1.303e22,  // в килограммах
      radius: 1188.3,  // в километрах
      distanceFromEarth: 5906380000 // в километрах
    },
    {
      code: 'SIRIUS', value: 'Сириус',
      description: 'Самая яркая звезда в ночном небе',
      mass: 4.018e30,  // в килограммах (удвоенная масса Солнца, так как это двойная система)
      radius: 1189640, // в километрах
      distanceFromEarth: 8.6 * 9.461e12 // в километрах (8.6 световых лет)
    },
    {
      code: 'ALPHA_CENTAURI', value: 'Альфа Центавра',
      description: 'Ближайшая звездная система к Солнечной системе',
      mass: 2.187e30,  // в килограммах (суммарная масса системы)
      radius: 695500,  // в километрах
      distanceFromEarth: 4.37 * 9.461e12 // в километрах (4.37 световых лет)
    },
    {
      code: 'BETELGEUSE', value: 'Бетельгейзе',
      description: 'Красный сверхгигант в созвездии Ориона',
      mass: 1.64e31,  // в килограммах (около 20 масс Солнца)
      radius: 617400, // в километрах
      distanceFromEarth: 642.5 * 9.461e12 // в километрах (642.5 световых лет)
    },
    {
      code: 'POLARIS', value: 'Полярная звезда',
      description: 'Звезда в созвездии Малой Медведицы',
      mass: 5.972e30, // в килограммах (около 3 масс Солнца)
      radius: 875500, // в километрах
      distanceFromEarth: 323.62 * 9.461e12 // в километрах (323.62 световых лет)
    },
    {
      code: 'ANDROMEDA', value: 'Андромеда',
      description: 'Галактика в созвездии Андромеды',
      mass: 1.23e42,  // в килограммах (масса галактики)
      radius: 110000, // в километрах
      distanceFromEarth: 2.537 * 9.461e19 // в километрах (2.537 миллиона световых лет)
    },
    {
      code: 'ORION', value: 'Орион',
      description: 'Созвездие Ориона',
      mass: 2.5e31,   // в килограммах (масса главных звезд)
      radius: 100000, // в километрах
      distanceFromEarth: 1350 * 9.461e12 // в километрах (1350 световых лет)
    },
    {
      code: 'URSA_MAJOR', value: 'Большая Медведица',
      description: 'Созвездие Большой Медведицы',
      mass: 2.4e32,   // в килограммах (масса главных звезд)
      radius: 200000, // в километрах
      distanceFromEarth: 81.9 * 9.461e12 // в километрах (81.9 световых лет)
    },
    {
      code: 'URSA_MINOR', value: 'Малая Медведица',
      description: 'Созвездие Малой Медведицы',
      mass: 3.8e30,   // в килограммах (масса главных звезд)
      radius: 50000,  // в километрах
      distanceFromEarth: 323.62 * 9.461e12 // в километрах (323.62 световых лет)
    },
      { 
        code: 'URSA_MINOR', 
        value: 'Малая Медведица',
        description: 'Созвездие Малой Медведицы',
        mass: 3.8e30,   // в килограммах (масса главных звезд)
        radius: 50000,  // в километрах
        distanceFromEarth: 323.62 * 9.461e12 // в километрах (323.62 световых лет)
      },
      { id: 846, code: 'CASSIOPEIA', value: 'Кассиопея', description: 'Звезда Кассиопеи', mass: 2.5e30, radius: 30000, distanceFromEarth: 280.78 * 9.461e12 },
      { id: 847, code: 'VEGA', value: 'Вега', description: 'Звезда Вега', mass: 2.1e30, radius: 25000, distanceFromEarth: 25.05 * 9.461e12 },
      { id: 848, code: 'ARCTURUS', value: 'Арктур', description: 'Звезда Арктура', mass: 1.1e31, radius: 30000, distanceFromEarth: 36.7 * 9.461e12 },
      { id: 849, code: 'ANTARES', value: 'Антарес', description: 'Звезда Антареса', mass: 1.15e31, radius: 32000, distanceFromEarth: 553.82 * 9.461e12 },
      { id: 850, code: 'PROCYON', value: 'Процион', description: 'Звезда Проциона', mass: 1.5e30, radius: 25000, distanceFromEarth: 11.41 * 9.461e12 },
      { id: 851, code: 'ALDEBARAN', value: 'Альдебаран', description: 'Звезда Альдебарана', mass: 1.4e31, radius: 40000, distanceFromEarth: 65.23 * 9.461e12 },
      { id: 852, code: 'REGULUS', value: 'Регул', description: 'Звезда Регула', mass: 2.8e31, radius: 45000, distanceFromEarth: 79.33 * 9.461e12 },
      { id: 853, code: 'SPICA', value: 'Спика', description: 'Звезда Спики', mass: 2.2e31, radius: 38000, distanceFromEarth: 260.26 * 9.461e12 },
      { id: 854, code: 'ALTAIR', value: 'Альтаир', description: 'Звезда Альтаира', mass: 1.8e31, radius: 36000, distanceFromEarth: 16.73 * 9.461e12 },
      { id: 855, code: 'CAPELLA', value: 'Капелла', description: 'Звезда Капеллы', mass: 1.2e31, radius: 34000, distanceFromEarth: 42.91 * 9.461e12 },
      { id: 856, code: 'DENEB', value: 'Денеб', description: 'Звезда Денеба', mass: 3.2e31, radius: 50000, distanceFromEarth: 1579.47 * 9.461e12 },
      { id: 857, code: 'ALBIREO', value: 'Альбирео', description: 'Звезда Альбирео', mass: 2.3e30, radius: 28000, distanceFromEarth: 380.43 * 9.461e12 },
      { id: 858, code: 'SUN_A', value: 'Солнце A', description: 'Солнце класса A', mass: 1.989e30, radius: 696340, distanceFromEarth: 0 },
      { id: 859, code: 'SUN_B', value: 'Солнце B', description: 'Солнце класса B', mass: 1.989e30, radius: 696340, distanceFromEarth: 0 },
      { id: 860, code: 'CYGNUS_X1', value: 'Лебедь X-1', description: 'Черная дыра Лебедь X-1', mass: 10, radius: 20, distanceFromEarth: 6000 * 9.461e12 },
      { id: 861, code: 'RIGEL', value: 'Ригель', description: 'Звезда Ригеля', mass: 3.7e31, radius: 62000, distanceFromEarth: 860.35 * 9.461e12 },
      { id: 862, code: 'VESPER', value: 'Веспер', description: 'Звезда Веспера', mass: 1.7e30, radius: 24000, distanceFromEarth: 25.38 * 9.461e12 },
      { id: 863, code: 'FOMALHAUT', value: 'Фомальгаут', description: 'Звезда Фомальгаута', mass: 1.9e31, radius: 40000, distanceFromEarth: 25.13 * 9.461e12 },
      { id: 864, code: 'CENT_A', value: 'Центавр A', description: 'Звезда Центавра A', mass: 3.1e31, radius: 54000, distanceFromEarth: 4.37 * 9.461e12 },
      { id: 865, code: 'SAT_I', value: 'Сатурн I', description: 'Спутник Сатурна I', mass: 5.6e20, radius: 1185.5, distanceFromEarth: 0.0 },
      { id: 866, code: 'JUP_IV', value: 'Юпитер IV', description: 'Спутник Юпитера IV', mass: 1.5e23, radius: 2410.3, distanceFromEarth: 0.0 },
      { id: 867, code: 'TITAN', value: 'Титан', description: 'Спутник Сатурна Титан', mass: 1.35e23, radius: 2575, distanceFromEarth: 1.2e6 * 9.461e12 },
      { id: 868, code: 'GANYMEDE', value: 'Ганимед', description: 'Спутник Юпитера Ганимед', mass: 1.48e23, radius: 2634.1, distanceFromEarth: 6.2e5 * 9.461e12 },
      { id: 869, code: 'CALLISTO', value: 'Каллисто', description: 'Спутник Юпитера Каллисто', mass: 1.08e23, radius: 2410.3, distanceFromEarth: 6.35e5 * 9.461e12 },
      { id: 870, code: 'IO', value: 'Ио', description: 'Спутник Юпитера Ио', mass: 8.9e22, radius: 1821.6, distanceFromEarth: 4.22e5 * 9.461e12 },
      { id: 871, code: 'EUROPA', value: 'Европа', description: 'Спутник Юпитера Европа', mass: 4.8e22, radius: 1560.8, distanceFromEarth: 6.76e5 * 9.461e12 },
      { id: 872, code: 'MIMAS', value: 'Мимас', description: 'Спутник Сатурна Мимас', mass: 3.75e19, radius: 198.2, distanceFromEarth: 1.2577e6 * 9.461e12 },
      { id: 873, code: 'ENCELADUS', value: 'Энцелад', description: 'Спутник Сатурна Энцелад', mass: 1.08e20, radius: 252.1, distanceFromEarth: 1.4458e6 * 9.461e12 },
      { id: 874, code: 'TETHYS', value: 'Тефия', description: 'Спутник Сатурна Тефия', mass: 6.17e20, radius: 531.1, distanceFromEarth: 1.521e6 * 9.461e12 },
      { id: 875, code: 'DIONE', value: 'Диона', description: 'Спутник Сатурна Диона', mass: 1.1e21, radius: 561.4, distanceFromEarth: 1.5114e6 * 9.461e12 },
      { id: 876, code: 'RHEA', value: 'Рея', description: 'Спутник Сатурна Рея', mass: 2.31e21, radius: 764.3, distanceFromEarth: 1.5235e6 * 9.461e12 }
    
    
  ];
  for (let i = 0; i < 50; i++) {
    const celestialBody = await prisma.celestialBody.create({
      data: {
        value: bodies[i].value,
        code: bodies[i].code,
        description: bodies[i].description,
        mass: bodies[i].mass,
        radius: bodies[i].radius,
        distanceFromEarth: bodies[i].distanceFromEarth,
      }
    });
    celestialBodies.push(celestialBody);
  }

  // // Create 10 Event records
  // const events = [];
  // for (let i = 0; i < 10; i++) {
  //   const event = await prisma.event.create({
  //     data: {
  //       name: `Event ${i}`,
  //       description: `Description of Event ${i}`,
  //       latitude: 34.0 + i,
  //       longitude: -118.0 - i,
  //       coordinatesSystemId: coordinateSystems[i % coordinateSystems.length].id,
  //       date: new Date(2024, 0, 1 + i),
  //       bodyId: celestialBodies[i % celestialBodies.length].id
  //     }
  //   });
  //   events.push(event);
  // }

  const observatories = []
  const observatoriesNames = [
    "Пулковская обсерватория",
    "Спасская обсерватория",
    "Гурьевская обсерватория",
    "Крымская астрофизическая обсерватория",
    "Саянское астрофизическое обсерватория",
    "Улугбекская обсерватория",
    "Шемахинская обсерватория",
    "Светлоярская астрономическая обсерватория",
    "Сониноская обсерватория",
    "Таюшаньская обсерватория",
    "Карачаевская астрофизическая обсерватория",
    "Розеншельдская обсерватория",
    "Ратнагири",
    "Агартала",
    "Боссо",
    "Баксар",
    "Калькатта",
    "Уткарша",
    "Визагапатам",
    "Тривандрум",
    "Хапсал",
    "Пулково",
    "Тарту",
    "Академгородок",
    "Акмолинская астрофизическая обсерватория",
    "Николаевская обсерватория",
    "Гершельская обсерватория",
    "Аркская обсерватория",
    "Монцарская обсерватория",
    "Тамское астрономическое общество",
    "Пермская обсерватория",
    "Лебедевская обсерватория",
    "Павловская обсерватория",
    "Иркутская обсерватория",
    "Казанская обсерватория",
    "Воронежская обсерватория",
    "Борское астрономическое училище",
    "Ташкентская астрономическая обсерватория",
    "Вильнюсская астрономическая обсерватория",
    "Монголовская астрономическая обсерватория",
    "Калужская астрономическая обсерватория",
    "Ватиканская астрономическая обсерватория",
    "Гринвичская обсерватория",
    "Лейденская астрономическая обсерватория",
    "Гамбургская астрономическая обсерватория",
    "Берлинская астрономическая обсерватория",
    "Пражская астрономическая обсерватория",
    "Венская астрономическая обсерватория",
    "Гавайская астрономическая обсерватория"
  ];

  const observatoryCoordinates = [
    { latitude: 59.8504, longitude: 30.3156 }, // Пулковская обсерватория (Санкт-Петербург, Россия)
    { latitude: 55.7617, longitude: 37.6176 }, // Спасская обсерватория (Москва, Россия)
    { latitude: 51.1633, longitude: 59.6193 }, // Гурьевская обсерватория (Уральск, Казахстан)
    { latitude: 44.6068, longitude: 34.3939 }, // Крымская астрофизическая обсерватория (Научное, Крым, Россия)
    { latitude: 51.3376, longitude: 94.7515 }, // Саянское астрофизическое обсерватория (Саяны, Россия)
    { latitude: 39.1670, longitude: -86.5265 }, // Улугбекская обсерватория (Блумингтон, Индиана, США)
    { latitude: 41.6676, longitude: 44.8198 }, // Шемахинская обсерватория (Шемаха, Азербайджан)
    { latitude: 53.1919, longitude: 45.0007 }, // Светлоярская астрономическая обсерватория (Светлоярский, Россия)
    { latitude: 56.0669, longitude: 12.6953 }, // Сониноская обсерватория (Сонино, Швеция)
    { latitude: 24.4721, longitude: 118.1253 }, // Таюшаньская обсерватория (Таюшань, Китай)
    { latitude: 44.9084, longitude: 34.0484 }, // Карачаевская астрофизическая обсерватория (Карачаевск, Карачаево-Черкесия, Россия)
    { latitude: 47.2348, longitude: 39.6988 }, // Розеншельдская обсерватория (Ростов-на-Дону, Россия)
    { latitude: 17.6896, longitude: 73.6692 }, // Ратнагири (Ратнагири, Индия)
    { latitude: 23.8315, longitude: 91.2868 }, // Агартала (Агартала, Индия)
    { latitude: -34.6037, longitude: -58.3816 }, // Боссо (Буэнос-Айрес, Аргентина)
    { latitude: 25.4358, longitude: 81.8463 }, // Баксар (Баксар, Индия)
    { latitude: 22.5726, longitude: 88.3639 }, // Калькатта (Калькутта, Индия)
    { latitude: 23.8729, longitude: 91.2794 }, // Уткарша (Уткарша, Бангладеш)
    { latitude: 17.6868, longitude: 83.2185 }, // Визагапатам (Визагапатам, Индия)
    { latitude: 8.5241, longitude: 76.9366 }, // Тривандрум (Тривандрум, Индия)
    { latitude: 58.8709, longitude: 22.8434 }, // Хапсал (Хапсал, Эстония)
    { latitude: 59.8504, longitude: 30.3156 }, // Пулковская обсерватория (Санкт-Петербург, Россия)
    { latitude: 58.3780, longitude: 26.7239 }, // Тартуская обсерватория (Тарту, Эстония)
    { latitude: 54.8533, longitude: 83.0963 }, // Академгородок (Новосибирск, Россия)
    { latitude: 51.2360, longitude: 71.4305 }, // Акмолинская астрофизическая обсерватория (Акмола, Казахстан)
    { latitude: 46.6981, longitude: 32.6504 }, // Николаевская обсерватория (Николаев, Украина)
    { latitude: 52.2053, longitude: 0.1192 }, // Гершельская обсерватория (Кембридж, Великобритания)
    { latitude: 64.5011, longitude: 40.5214 }, // Аркская обсерватория (Архангельск, Россия)
    { latitude: 46.1932, longitude: 9.0244 }, // Монцарская обсерватория (Монце, Италия)
    { latitude: 48.7223, longitude: 44.5367 }, // Тамское астрономическое общество (Тамбов, Россия)
    { latitude: 58.0104, longitude: 56.2343 }, // Пермская обсерватория (Пермь, Россия)
    { latitude: 44.6068, longitude: 34.3939 }, // Лебедевская обсерватория (Научное, Крым, Россия)
    { latitude: 45.0382, longitude: 38.9765 }, // Павловская обсерватория (Саратов, Россия)
    { latitude: 52.2871, longitude: 104.2807 }, // Иркутская обсерватория (Иркутск, Россия)
    { latitude: 55.7960, longitude: 49.1063 }, // Казанская обсерватория (Казань, Россия)
    { latitude: 51.6615, longitude: 39.2003 }, // Воронежская обсерватория (Воронеж, Россия)
    { latitude: 55.4335, longitude: 37.7480 }, // Борское астрономическое училище (Борское, Россия)
    { latitude: 41.3159, longitude: 69.2252 }, // Ташкентская астрономическая обсерватория (Ташкент, Узбекистан)
    { latitude: 54.6804, longitude: 25.3190 }, // Вильнюсская астрономическая обсерватория (Вильнюс, Литва)
    { latitude: 47.9188, longitude: 106.8832 }, // Монголовская астрономическая обсерватория (Улаанбаатар, Монголия)
    { latitude: 54.5404, longitude: 36.2754 }, // Калужская астрономическая обсерватория (Калуга, Россия)
    { latitude: 41.9039, longitude: 12.4534 }, // Ватиканская астрономическая обсерватория (Ватикан, Ватикан)
    { latitude: 51.4779, longitude: 0.0015 }, // Гринвичская обсерватория (Лондон, Великобритания)
    { latitude: 52.1558, longitude: 4.4905 }, // Лейденская астрономическая обсерватория (Лейден, Нидерланды)
    { latitude: 53.5753, longitude: 9.9811 }, // Гамбургская астрономическая обсерватория (Гамбург, Германия)
    { latitude: 52.4826, longitude: 13.3375 }, // Берлинская астрономическая обсерватория (Берлин, Германия)
    { latitude: 50.0818, longitude: 14.4265 }, // Пражская астрономическая обсерватория (Прага, Чехия)
    { latitude: 48.2082, longitude: 16.3738 }, // Венская астрономическая обсерватория (Вена, Австрия)
    { latitude: 19.8280, longitude: -155.4741 } // Гавайская астрономическая обсерватория (Гаваи, США)

  ];

  console.log(observatoryCoordinates.length)

  for (let i = 0; i < 49; i++) {
    const observatory = await prisma.observatory.create({
      data: {
        name: observatoriesNames[i],
        description: `Описание обсерватории ${observatoriesNames[i]}`,
        latitude: observatoryCoordinates[i].latitude,
        longitude: observatoryCoordinates[i].longitude,
        countryId: countries[i % countries.length].id,
        openDate: new Date(1990, 0, 1 + i),
        workersAmount: Math.floor(Math.random() * (50 - 5 + 1)) + 5,
      }
    });
    observatories.push(observatory);
  }

const astronomers = [];
const astronomerNames = [
    // Russian names
    "Иван Иванов",
    "Петр Петров",
    "Александр Смирнов",
    "Сергей Кузнецов",
    "Михаил Федоров",
    "Андрей Морозов",
    "Алексей Волков",
    "Дмитрий Павлов",
    "Юрий Семенов",
    "Николай Григорьев",
    // English names
    "John Smith",
    "Michael Johnson",
    "Emma Williams",
    "Sophia Brown",
    "Matthew Davis",
    "Olivia Martinez",
    "Daniel Wilson",
    "Emily Anderson",
    "David Taylor",
    "Sarah Thompson",
    // French names
    "Jean Dupont",
    "Marie Dubois",
    "Thomas Lambert",
    "Camille Leroy",
    "Nicolas Moreau",
    "Manon Girard",
    "Lucas Rousseau",
    "Chloé Lefèvre",
    "Simon Fournier",
    "Élise Martin",
    // Italian names
    "Luca Rossi",
    "Giulia Bianchi",
    "Marco Ricci",
    "Alessia Esposito",
    "Lorenzo Ferrari",
    "Martina Romano",
    "Davide Russo",
    "Chiara Conti",
    "Gabriele Leone",
    "Elena Colombo",
    // German names
    "Max Müller",
    "Anna Schmidt",
    "Lukas Wagner",
    "Sophie Fischer",
    "Paul Weber",
    "Lea Schmitt",
    "Jonas Richter",
    "Maria Berger",
    "Tim Klein",
    "Laura Hofmann"
  ];
  
 for (let i = 0; i < 50; i++) {
   const astronomer = await prisma.astronomer.create({
     data: {
       name: astronomerNames[i],
       birthday: new Date(1970, 0, 1 + i),
       biography: `Биография астронома ${astronomerNames[i]}`,
       countryId: countries[i % countries.length].id
     }
   });
   astronomers.push(astronomer);
 }

//  // Create 10 Observation records
//  for (let i = 0; i < 10; i++) {
//    await prisma.observation.create({
//      data: {
//        title: `Observation ${i}`,
//        date: new Date(),
//        description: `Description of Observation ${i}`,
//        eventId: events[i % events.length].id,
//        observatoryId: observatories[i % observatories.length].id,
//        astronomerId: astronomers[i % astronomers.length].id
//      }
//    });
//  }

 console.log('Seed data created');
}

main()
 .catch(e => {
   console.error(e);
   process.exit(1);
 })
 .finally(async () => {
   await prisma.$disconnect();
 });