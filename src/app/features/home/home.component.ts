import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { Movie, Genre } from '../../core/models/movie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  // Acá guardamos los datos que traemos de la API
  trending: Movie[] = [];
  genres: Genre[] = [];
  movies: Movie[] = [];

  // Filtro y paginación
  selectedGenreId: number | null = null;
  currentPage: number = 1;
  totalPages: number = 1;

  // Mensajes para el usuario
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadTrending();
    this.loadGenres();
    this.loadMovies();
  }

  loadTrending(): void {
    this.movieService.getTrending().subscribe({
      next: (respuesta) => {
        this.trending = respuesta.results;
      },
      error: () => {
        console.log('Error al traer tendencias');
      }
    });
  }

  loadGenres(): void {
    this.movieService.getGenres().subscribe({
      next: (respuesta) => {
        this.genres = respuesta.genres;
      },
      error: () => {
        console.log('Error al traer generos');
      }
    });
  }

  loadMovies(): void {
    this.loading = true;
    this.errorMessage = '';

    this.movieService.getMovies(this.selectedGenreId, this.currentPage).subscribe({
      next: (respuesta) => {
        this.movies = respuesta.results;
        this.totalPages = respuesta.total_pages;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las peliculas.';
        this.loading = false;
      }
    });
  }

  selectGenre(genreId: number | null): void {
    this.selectedGenreId = genreId;
    this.currentPage = 1;
    this.loadMovies();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMovies();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMovies();
    }
  }

  getPosterUrl(path: string): string {
    return this.movieService.getPosterUrl(path);
  }
}