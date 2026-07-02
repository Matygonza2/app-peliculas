import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Favorito } from '../model/favorito';
import { Pelicula } from '../model/pelicula';

@Injectable({
    providedIn: 'root'
})
export class FavoritosService {
    private readonly apiUrl = environment.apiFavoritosUrl;

    private mapaFavoritos = new BehaviorSubject<Map<number, number>>(new Map());

    constructor(private http: HttpClient) {
        this.cargarMapaFavoritos();
    }

    private cargarMapaFavoritos(): void {
        this.http.get<Favorito[]>(`${this.apiUrl}/favoritos`).subscribe({
            next: (favoritos) => {
                const mapa = new Map(favoritos.map(f => [f.movieId, f.id]));
                this.mapaFavoritos.next(mapa);
            },
            error: (err) => console.error('Error al cargar favoritos:', err)
        });
    }

    /**
     * Obtiene la lista completa de favoritos desde el JSON Server.
     */
    obtenerFavoritos(): Observable<Favorito[]> {
        return this.http.get<Favorito[]>(`${this.apiUrl}/favoritos`);
    }

    /**
     * Verifica si una pelicula (por movieId de TMDB)
     * ya esta en favoritos.
     */
    esFavorito(movieId: number): Observable<boolean> {
        return this.mapaFavoritos.pipe(map(mapa => mapa.has(movieId)));
    }

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
        return this.http.post<Favorito>(`${this.apiUrl}/favoritos`, body).pipe(
            tap((favoritoCreado) => {
                const mapa = new Map(this.mapaFavoritos.value);
                mapa.set(favoritoCreado.movieId, favoritoCreado.id);
                this.mapaFavoritos.next(mapa);
            })
        );
    }

    /**
     * Elimina un favorito por su id interno de json-server.
     */
    eliminarFavorito(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/favoritos/${id}`).pipe(
            tap(() => {
                // Actualizamos el mapa buscando que movieId tenia este id
                const mapa = new Map(this.mapaFavoritos.value);
                for (const [movieId, favoritoId] of mapa.entries()) {
                    if (favoritoId === id) {
                        mapa.delete(movieId);
                        break;
                    }
                }
                this.mapaFavoritos.next(mapa);
            })
        );
    }

    /**
     * Elimina un favorito a partir del movieId de TMDB.
     */
    eliminarFavoritoPorMovieId(movieId: number): Observable<void> {
        const idInterno = this.mapaFavoritos.value.get(movieId);
        if (idInterno === undefined) {
            console.warn('Intentando eliminar una pelicula que no esta en favoritos');
            return new Observable<void>(subscriber => subscriber.complete());
        }
        return this.eliminarFavorito(idInterno);
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
