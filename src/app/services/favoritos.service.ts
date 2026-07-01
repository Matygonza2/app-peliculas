import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorito } from '../model/favorito';
import { Pelicula } from '../model/pelicula';

@Injectable({
    providedIn: 'root'
})
export class FavoritosService {
    private readonly apiUrl = environment.apiFavoritosUrl;

    constructor(private http: HttpClient) { }

    /**
     * Obtiene la lista completa de favoritos desde el JSON Server.
     */
    obtenerFavoritos(): Observable<Favorito[]> {
        return this.http.get<Favorito[]>(`${this.apiUrl}/favoritos`);
    }

    /**
     * Agrega una pelicula a la lista de favoritos.
     * @param pelicula Objeto Pelicula de la api TMBD
     * @returns Observable con la respuesta
     */
    agregarFavorito(pelicula: Pelicula): Observable<Favorito> {
        const body = {
            movieId: pelicula.id,
            title: pelicula.title,
            poster_path: pelicula.poster_path,
            release_date: pelicula.release_date instanceof Date
                ? pelicula.release_date.toISOString().split('T')[0]
                : pelicula.release_date,
            vote_average: pelicula.vote_average
        };
        return this.http.post<Favorito>(`${this.apiUrl}/favoritos`, body);
    }

    /**
     * Elimina un favorito por su id de JSON Server.
     * @param id Identificador del favorito en JSON Server
     */
    eliminarFavorito(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/favoritos/${id}`);
    }

    /**
     * Obtiene la URL de la imagen de TMDB para un poster_path.
     * @param path Ruta de la imagen
     * @param tamaño Tamanio deseado
     */
    obtenerUrlImagen(path: string | null, tamanio: string = 'w185'): string {
        if (!path) {
            return 'assets/placeholder.png';
        }
        return `https://image.tmdb.org/t/p/${tamanio}${path}`;
    }
}
