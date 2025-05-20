import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiUrl = 'http://localhost:3017/api/youtube/search';

  constructor(private http: HttpClient) {}

  searchVideos(query: string): Observable<{ videos: Video[] }> {
    return this.http.get<{ videos: Video[] }>(`${this.apiUrl}?q=${encodeURIComponent(query)}`);
  }
}
