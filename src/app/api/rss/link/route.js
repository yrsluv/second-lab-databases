import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';

export async function GET(req) {
  try {
    const url = req.nextUrl.searchParams.get('rssUrl'); 
    if (!url) {
      return NextResponse.json({
        success: false,
        message: 'No RSS URL provided',
      });
    }

    const parser = new Parser();
    const newFeed = await parser.parseURL(url);

    console.log(newFeed)

    const filePath = path.join(process.cwd(), 'public', 'rss.json');

    // Check if the file exists, and read existing content
    let existingContent = { items: [] };
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      try {
        existingContent = JSON.parse(fileContent); // Assuming JSON format
      } catch (err) {
        console.error('Error parsing existing RSS file:', err);
      }
    }

    // Append new items to existing content
    const combinedItems = [...existingContent.items, ...newFeed.items];

    // Write updated RSS content back to the file
    const updatedContent = JSON.stringify({ ...newFeed, items: combinedItems }, null, 2);
    fs.writeFileSync(filePath, updatedContent);

    return NextResponse.json({
      success: true,
      filePath: filePath,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Ошибка при обработке RSS',
    });
  }
}
