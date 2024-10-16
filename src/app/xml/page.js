'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PlanetsTable() {
  const [planets, setPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  useEffect(() => {
    // Загружаем и парсим XML файл
    fetch('/planets.xml')
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'text/xml');
        const planetNodes = xml.getElementsByTagName('planet');
        const planetList = Array.from(planetNodes).map((node) => ({
          name: node.getElementsByTagName('name')[0].textContent,
          diameter: parseFloat(node.getElementsByTagName('diameter')[0].textContent), // Преобразуем в число
          distanceFromSun: parseFloat(node.getElementsByTagName('distance_from_sun')[0].textContent), // Преобразуем в число
          orbitalPeriod: parseFloat(node.getElementsByTagName('orbital_period')[0].textContent), // Преобразуем в число
          moons: parseInt(node.getElementsByTagName('moons')[0].textContent, 10), // Преобразуем в число
        }));
        setPlanets(planetList);
      });
  }, []);

  // Функция для фильтрации планет по всем параметрам
  const filteredPlanets = planets.filter((planet) => {
    const search = searchTerm.toLowerCase();
    return (
      planet.name.toLowerCase().includes(search) ||
      planet.diameter.toLowerCase().includes(search) ||
      planet.distanceFromSun.toLowerCase().includes(search) ||
      planet.orbitalPeriod.toLowerCase().includes(search) ||
      planet.moons.toLowerCase().includes(search)
    );
  });

  // Функция для сортировки планет
  const sortedPlanets = filteredPlanets.sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (sortConfig.direction === 'ascending') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    }
    return 0;
  });

  // Функция для обработки кликов по заголовкам таблицы
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex-auto">
      <h1 className="text-3xl font-bold text-center mb-8">XML</h1>

      <div className="mb-6">
        <label htmlFor="search" className="block text-lg">Поиск по всем параметрам планеты:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mt-2 border text-neutral-950 border-gray-300 rounded-md shadow-sm"
          placeholder="Поиск"
        />
      </div>

      <table className="min-w-full table-auto shadow-md rounded-lg">
        <thead className='select-none'>
          <tr className="bg-indigo-600 text-white">
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>Название</th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('diameter')}>Диаметр (км)</th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('distanceFromSun')}>Расстояние до Солнца (млн км)</th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('orbitalPeriod')}>Орбитальный период (дни)</th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('moons')}>Количество спутников</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlanets.map((planet, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{planet.name}</td>
              <td className="px-4 py-2">{planet.diameter}</td>
              <td className="px-4 py-2">{planet.distanceFromSun}</td>
              <td className="px-4 py-2">{planet.orbitalPeriod}</td>
              <td className="px-4 py-2">{planet.moons}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 text-center">
        <Link href="/planets.xml" target='_blank'>Посмотреть XML файл</Link>
      </div>
    </div>
  );
}
