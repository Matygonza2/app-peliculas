import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Movie, Genre } from '../models/movie.model';

// Estas son las "formas" que devuelve la API de TMDB para listas y géneros.
interface MovieListResponse {
  results: Movie[];
  total_pages: number;
}

interface GenreListResponse {
  genres: Genre[];
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;
  private imageUrl = environment.imageUrl;

  constructor(private http: HttpClient) {}

  // Películas que están en tendencia hoy.
  getTrending(): Observable<MovieListResponse> {
    const url = `${this.apiUrl}/trending/movie/day?api_key=${this.apiKey}&language=es-AR`;
    return this.http.get<MovieListResponse>(url);
  }

  // Lista de géneros (Acción, Drama, Comedia, etc.)
  getGenres(): Observable<GenreListResponse> {
    const url = `${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}&language=es-AR`;
    return this.http.get<GenreListResponse>(url);
  }

  // Películas filtradas por género y por página (para el paginador).
  getMovies(genreId: number | null, page: number): Observable<MovieListResponse> {
    let url = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&language=es-AR&page=${page}`;
    if (genreId) {
      url += `&with_genres=${genreId}`;
    }
    return this.http.get<MovieListResponse>(url);
  }

  // Arma la URL completa de la imagen del póster.
  getPosterUrl(path: string): string {
    if (!path) {
      return 'https://placehold.co/300x450?text=Sin+imagen';
    }
    return `${this.imageUrl}/w342${path}`;
  }
}
