import { Component, OnInit } from '@angular/core';
import { DetalleService } from '../../services/detalle.service';
import { Pelicula, PeliculaDetalle } from '../../model/pelicula';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  imports: [],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})

export class DetalleComponent implements OnInit {

  peliculas: Pelicula[] = [];
  peliculaSeleccionada?: PeliculaDetalle;

  constructor(
    private _detalleService: DetalleService,
    private _route: ActivatedRoute
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
}