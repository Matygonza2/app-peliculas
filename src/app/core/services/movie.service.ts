import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse, GenreListResponse } from '../../model/pelicula';


@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;
  private imageUrl = environment.imageUrl;
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Películas que están en tendencia hoy.
  getTrending(): Observable<ApiResponse> {
    const url = `${this.apiUrl}/trending/movie/day?api_key=${this.apiKey}&language=es-AR`;
    return this.http.get<ApiResponse>(url);
  }

  // Lista de géneros (Acción, Drama, Comedia, etc.)
  getGenres(): Observable<GenreListResponse> {
    const url = `${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}&language=es-AR`;
    return this.http.get<GenreListResponse>(url);
  }

  // Películas filtradas por género y por página (para el paginador).
  getMovies(genreId: number | null, page: number): Observable<ApiResponse> {
    let url = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&language=es-AR&page=${page}`;
    if (genreId) {
      url += `&with_genres=${genreId}`;
    }
    return this.http.get<ApiResponse>(url);
  }

  // Arma la URL completa de la imagen del póster.
  getPosterUrl(path: string): string {
    if (!path) {
      return 'https://placehold.co/300x450?text=Sin+imagen';
    }
    return `${this.imageUrl}/w342${path}`;
  }

  /**
   * Obtiene una pagina de peliculas populares usando el endpoint discover,
   * ordenadas por popularidad descendente y filtrando por ingles/español.
   * @param pagina numero de pagina (por defecto 1)
   */
  public obtenerPeliculasPopulares(pagina: number = 1): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'es-ES')
      .set('with_original_language', 'en|es')
      .set('sort_by', 'popularity.desc')
      .set('page', pagina.toString());

    return this.http.get<ApiResponse>(`${this.baseUrl}/discover/movie`, { params });
  }

  /**
   * Obtiene una pagina de peliculas mas votadas, con al menos 200 votos.
   * @param pagina numero de pagina (por defecto 1)
   */
  public obtenerPeliculasMasVotadas(pagina: number = 1): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'es-ES')
      .set('with_original_language', 'en|es')
      .set('sort_by', 'vote_average.desc')
      .set('vote_count.gte', '200')
      .set('page', pagina.toString());

    return this.http.get<ApiResponse>(`${this.baseUrl}/discover/movie`, { params });
  }

  // Busca peliculas por titulo (query)
  searchMovies(query: string, page: number = 1): Observable<ApiResponse> {
    const url = `${this.apiUrl}/search/movie?api_key=${this.apiKey}&language=es-AR&page=${page}&query=${encodeURIComponent(query)}`;
    return this.http.get<ApiResponse>(url);
  }

  obtenerUrlImagen(ruta: string | null, tamaño: string = 'w300'): string {
    if (!ruta) {
      return 'assets/placeholder.png';
    }
    return `https://image.tmdb.org/t/p/${tamaño}${ruta}`;
  }
}
