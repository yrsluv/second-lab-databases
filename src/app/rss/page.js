'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function RssFeedPage() {
  const [rssFeed, setRssFeed] = useState(null);
  const [rssUrl, setRssUrl] = useState('');
  const [newPost, setNewPost] = useState({ title: '', description: '' });
  const [message, setMessage] = useState('');

  // Функция для получения RSS ленты
  const fetchRssFeed = async () => {
    if (!rssUrl) return;

    try {
      const res = await fetch(`/api/rss/link?rssUrl=${encodeURIComponent(rssUrl)}`);
      const data = await res.json();
      if (data.success) {
        fetchLocalRss();
      } else {
        setMessage(data.message || 'Не удалось загрузить RSS');
      }
    } catch (error) {
      console.error('Ошибка при загрузке RSS ленты:', error);
      setMessage('Ошибка при загрузке RSS ленты');
    }
  };

  // Функция для добавления новой записи в RSS
  const addNewPost = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/rss/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      const data = await res.json();

      if (data.success) {
        setMessage('Новая запись успешно добавлена!');
        setNewPost({ title: '', description: '' });
        fetchLocalRss(); // Обновление ленты после добавления новой записи
      } else {
        setMessage(data.message || 'Не удалось добавить запись');
      }
    } catch (error) {
      console.error('Ошибка при добавлении новой записи:', error);
      setMessage('Ошибка при добавлении новой записи');
    }
  };

  // Получение локального RSS
  const fetchLocalRss = async () => {
    try {
      const res = await fetch('/rss.json');
     const data = await res.json();
     console.log(data)
      const sortedItems = data.items.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
      setRssFeed({ ...data.data, items: sortedItems });
    } catch (error) {
      console.error('Ошибка при загрузке локальной RSS ленты:', error);
      setMessage('Ошибка при загрузке локальной RSS ленты');
    }
  };

  useEffect(() => {
    fetchLocalRss();
  }, []);

  return (
    <div className='flex-auto p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>RSS Лента</h1>

      {/* Ввод для получения RSS ленты по ссылке */}
      <div className='mb-4'>
        <input
          className='p-2 border rounded-md w-full mb-2 dark:bg-gray-800 dark:border-gray-700'
          type="text"
          placeholder="Введите ссылку на RSS ленту"
          value={rssUrl}
          onChange={(e) => setRssUrl(e.target.value)}
        />
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-600 dark:hover:bg-blue-800'
          onClick={fetchRssFeed}>
          Загрузить RSS
        </button>
      </div>

      {/* Форма для добавления новой записи в RSS */}
      <form onSubmit={addNewPost} className='mb-4'>
        <h2 className='text-xl font-semibold mb-2'>Добавить новую запись</h2>
        <input
          className='p-2 border rounded-md w-full mb-2 dark:bg-gray-800 dark:border-gray-700'
          type="text"
          placeholder="Заголовок"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          required
        />
        <textarea
          className='p-2 border rounded-md w-full mb-2 dark:bg-gray-800 dark:border-gray-700'
          placeholder="Описание"
          value={newPost.description}
          onChange={(e) =>
            setNewPost({ ...newPost, description: e.target.value })
          }
          required
        />
        <button 
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded dark:bg-green-600 dark:hover:bg-green-800' 
          type="submit">
          Добавить запись
        </button>
      </form>

      {message && <p className='text-red-500'>{message}</p>}

      {/* Отображение RSS ленты */}
      {rssFeed && rssFeed.items ? (
        <div>
          <h2 className='text-xl font-semibold mb-4'>Содержимое RSS ленты</h2>
          <ul className='space-y-4'>
            {rssFeed.items.map((item, index) => (
              <li key={index} className='p-4 border rounded-md dark:border-gray-700'>
                {item.link ? <Link href={item.link} target="_blank"><strong className='block text-lg text-indigo-600'>{item.title}</strong></Link> : <strong className='block text-lg'>{item.title}</strong>}
                <p>{item.description}</p>
                <small className='text-gray-600 dark:text-gray-400'>{item.pubDate}</small>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className='text-gray-700 dark:text-gray-300'>Нет загруженной RSS ленты или неверный формат.</p>
      )}
    </div>
  );
}
