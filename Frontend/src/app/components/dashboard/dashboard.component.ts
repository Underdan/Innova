// File: Frontend/src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { FavoritesService } from '../../services/favorites.service';
import { Video } from '../../models/video.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  query: string = '';
  videos: Video[] = [];
  currentView: 'search' | 'favorites' = 'search';

  constructor(
    private youtubeService: YoutubeService,
    private favoritesService: FavoritesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    const userId = user?.id;

    if (!userId) {
      this.toastr.warning('Usuario no autenticado');
      return;
    }

    this.favoritesService.getFavorites(userId).subscribe({
      next: (res) => {
        this.videos = res.favorites;
      },
      error: () => {
        this.toastr.error('Error al cargar favoritos');
      }
    });
  }

  search(): void {
    if (!this.query.trim()) return;

    this.youtubeService.searchVideos(this.query).subscribe({
      next: (res) => {
        this.videos = res.videos;
      },
      error: (err) => {
        console.error('Error al buscar videos:', err);
        this.toastr.error('Error al buscar en YouTube');
      }
    });
  }

  addToFavorites(video: Video): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    const userId = user?.id;

    if (!userId) {
      this.toastr.warning('Debes iniciar sesión para guardar favoritos');
      return;
    }

    this.favoritesService.addFavorite(video, userId).subscribe({
      next: () => this.toastr.success('Video agregado a favoritos'),
      error: () => this.toastr.warning('Ya está en favoritos o hubo un error')
    });
  }

  removeFavorite(videoId: string): void {
  const user = JSON.parse(localStorage.getItem('user')!);
  const userId = user?.id;

  if (!userId) {
    this.toastr.warning('Usuario no autenticado');
    return;
  }

  this.favoritesService.deleteFavorite(userId, videoId).subscribe({
    next: () => {
      this.toastr.success('Favorito eliminado');
      this.loadFavorites(); // recargar lista
    },
    error: () => this.toastr.error('Error al eliminar favorito')
  });
}

}