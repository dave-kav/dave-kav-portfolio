import { RSSFeedResponse } from '../types/blog';

export async function fetchRSSFeed(substackUrl: string): Promise<RSSFeedResponse> {
  const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';
  const url = `${RSS2JSON_API}${encodeURIComponent(substackUrl)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error('Failed to fetch RSS feed');
    }

    return data as RSSFeedResponse;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    throw error;
  }
} 