import { Component } from '@angular/core';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { TarjetaPeliculaComponent } from '../../shared/components/tarjeta-pelicula/tarjeta-pelicula.component';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../../model/pelicula';
import { map, Observable } from 'rxjs';
import { MovieService } from '../../core/services/movie.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TarjetaPeliculaComponent, CarruselComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  peliculasPopulares$!: Observable<Pelicula[]>;
  peliculasMasVotadas$!: Observable<Pelicula[]>;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.peliculasPopulares$ = this.movieService.obtenerPeliculasPopulares().pipe(
      map(respuesta => respuesta.results)
    );

    this.peliculasMasVotadas$ = this.movieService.obtenerPeliculasMasVotadas().pipe(
      map(respuesta => respuesta.results)
    );
  }

  trackPorId(index: number, pelicula: Pelicula): number {
    return pelicula.id;
  }

}
