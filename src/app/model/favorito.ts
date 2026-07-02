import { Pelicula } from './pelicula';

/**
 * Representa un elemento de la lista de favoritos almacenado en JSON Server.
 * - id: autogenerado por JSON Server.
 * - movieId: id de la pelicula en la api.
 * - Los demas campos coinciden con los de Pelicula.
 */
export interface Favorito {
    id: number;
    movieId: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}
