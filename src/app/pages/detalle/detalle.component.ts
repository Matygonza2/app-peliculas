import { Component, OnInit } from '@angular/core';
import { DetalleService } from '../../services/detalle.service';
import { Pelicula, PeliculaDetalle } from '../../model/pelicula';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})

export class DetalleComponent implements OnInit {
  peliculas: Pelicula[] = [];
  peliculaSeleccionada?: PeliculaDetalle;

  constructor(
    private _detalleService: DetalleService,
    private _route: ActivatedRoute,
    private favoritosService: FavoritosService
  ) { }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this.obtenerPeliculaPorID(Number(id));
  }


  obtenerPeliculaPorID(id: number) {
    this._detalleService.ObtenerPeliculaPorIDService(id).subscribe({
      next: (data: PeliculaDetalle) => {
        this.peliculaSeleccionada = data;
      },
      error: error => console.log(error)
    })
  }

  agregarALista(): void {
    if (!this.peliculaSeleccionada) {
      console.warn('No hay película seleccionada');
      return;
    }

    const p = this.peliculaSeleccionada;
    const peliculaParaFavorito: Pelicula = {
      id: p.id,
      title: p.title,
      poster_path: p.poster_path,
      release_date: new Date(p.release_date),
      vote_average: p.vote_average,
      adult: false,
      backdrop_path: p.backdrop_path,
      genre_ids: p.genres.map(g => g.id),
      original_language: p.original_language,
      original_title: p.original_title,
      overview: p.overview,
      popularity: p.popularity,
      video: false,
      vote_count: 0,
      softcore: false
    };

    this.favoritosService.agregarFavorito(peliculaParaFavorito).subscribe({
      next: () => console.log('Agregada a favoritos'),
      error: (err) => console.error('Error al agregar:', err)
    });
  }
}