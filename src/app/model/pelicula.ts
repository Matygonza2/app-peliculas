export interface Pelicula{
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    title: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: Date,
    softcore: boolean,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface ApiResponse{
    page : number,
    results: Pelicula[],
    total_pages:number,
    total_results:number
}

export interface Genero{
    id: number,
    name: string
}

export interface PeliculaDetalle{
    adult: boolean;
    backdrop_path: string;
    budget: number;
    genres: Genero[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}