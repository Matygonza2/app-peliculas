import { Component, Input } from '@angular/core';
import { Pelicula } from '../../../model/pelicula';
import { MovieService } from '../../../core/services/movie.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tarjeta-pelicula',
  imports: [RouterLink, CommonModule],
  templateUrl: './tarjeta-pelicula.component.html',
  styleUrl: './tarjeta-pelicula.component.css'
})
export class TarjetaPeliculaComponent {
  @Input() pelicula!: Pelicula;

  constructor(private peliculaService: MovieService) { }

  obtenerPoster(): string {
    return this.peliculaService.obtenerUrlImagen(this.pelicula.poster_path, 'w300');
  }

  obtenerAnio(): string {
    if (!this.pelicula.release_date) return '';
    return new Date(this.pelicula.release_date).getFullYear().toString();
  }
}
