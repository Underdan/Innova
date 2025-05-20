import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = 'http://localhost:3017/api/favorites';

  constructor(private http: HttpClient) {}

  addFavorite(video: Video, userId: number) {
    const body = {
      userId,
      videoId: video.videoId,
      title: video.title,
      description: video.description,
      thumbnail: video.thumbnail
    };
    return this.http.post(`${this.apiUrl}/add`, body);
  }

  getFavorites(userId: number) {
  return this.http.get<{ favorites: Video[] }>(`${this.apiUrl}/${userId}`);
    }

  deleteFavorite(userId: number, videoId: string) {
    return this.http.delete(`${this.apiUrl}/${userId}/${videoId}`);
  }


}
