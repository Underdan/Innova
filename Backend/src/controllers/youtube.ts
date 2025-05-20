// File: Backend/controllers/youtube.ts
import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || 'AIzaSyA81YscnIqpldGzea6QBjzCcl7y1KN-UzU';

interface YouTubeVideoItem {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: { url: string }
    }
  };
}

interface YouTubeAPIResponse {
  items: YouTubeVideoItem[];
}

export const searchVideos = async (req: Request, res: Response): Promise<void> => {
  const query = req.query.q as string;

  if (!query) {
    res.status(400).json({ error: 'Se requiere el término de búsqueda' });
    return;
  }

  try {
    const response = await axios.get<YouTubeAPIResponse>('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        key: YOUTUBE_API_KEY,
        maxResults: 10,
        type: 'video'
      }
    });

    const videos = response.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url
    }));

    res.json({ videos });
  } catch (error) {
    console.error('Error en la API de YouTube:', error);
    res.status(500).json({ error: 'Error al buscar videos en YouTube' });
  }
};
