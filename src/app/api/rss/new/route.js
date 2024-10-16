import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json({
        success: false,
        message: 'Необходими указать название и описание',
      });
    }

    const filePath = path.join(process.cwd(), 'public', 'rss.json');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({
        success: false,
        message: 'Ошибка при обработке RSS',
      });
    }

    const existingContent = fs.readFileSync(filePath, 'utf-8');
    let rssData;

    try {
      rssData = JSON.parse(existingContent); 
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: 'Ошибка при обработке RSS',
      });
    }

    rssData.items.push({
      title: title,
      description: description,
      pubDate: new Date().toUTCString(),
      isoDate: new Date().toISOString(),
    });

    fs.writeFileSync(filePath, JSON.stringify(rssData, null, 2));

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Ошибка при обработке RSS',
    });
  }
}
