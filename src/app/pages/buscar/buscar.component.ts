import { Component } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Genero, Pelicula } from '../../model/pelicula';
import { FormsModule } from '@angular/forms';
import { TarjetaPeliculaComponent } from '../../shared/components/tarjeta-pelicula/tarjeta-pelicula.component';

@Component({
  selector: 'app-buscar',
  imports: [CommonModule, FormsModule, TarjetaPeliculaComponent],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent {

  // Datos
  genres: Genero[] = [];
  movies: Pelicula[] = [];

  // Filtros
  selectedGenreId: number | null = null;
  query: string = '';

  // Paginación
  currentPage: number = 1;
  totalPages: number = 1;

  // Estados
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadGenres();
    this.loadMovies();
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

    // Decidir qué llamada hacer
    let call;

    if (this.query.trim() !== '') {
      // Modo busqueda por titulo
      call = this.movieService.searchMovies(this.query, this.currentPage);
    } else {
      // Modo descubrimiento (con o sin genero)
      call = this.movieService.getMovies(this.selectedGenreId, this.currentPage);
    }

    call.subscribe({
      next: (resp) => {
        this.movies = resp.results;
        this.totalPages = resp.total_pages;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las películas.';
        this.loading = false;
      }
    });
  }

  selectGenre(genreId: number | null): void {
    this.selectedGenreId = genreId;
    this.currentPage = 1;
    this.loadMovies();
  }

  // Al buscar por texto, se limpia el género y se recarga
  onSearch(): void {
    this.selectedGenreId = null;
    this.currentPage = 1;
    this.loadMovies();
  }

  // Navegación de páginas
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

}
