export interface BlogPost {
  guid: string;
  title: string;
  link: string;
  description: string;
  content: string;
  pubDate: string;
  author: string;
  thumbnail?: string;
  enclosure?: {
    link: string;
    type: string;
  };
}

export interface FeedData {
  url: string;
  title: string;
  link: string;
  author: string;
  description: string;
  image: string;
}

export interface RSSFeedResponse {
  status: string;
  feed: FeedData;
  items: BlogPost[];
} 