import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../model/pelicula'
import { DetalleService } from '../../services/detalle.service'
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  peliculas: Pelicula[] = []

  constructor(
    private _DetalleService: DetalleService) {

  }

  ngOnInit(): void {
    this.listarPeliculas();

  }

  listarPeliculas() {
    this._DetalleService.ObtenerPeliculasService().subscribe({
      next: (data) => {
        this.peliculas = data.results;
        console.log(this.peliculas)
      },
      error: error => console.log(error)

    })
  }

}
