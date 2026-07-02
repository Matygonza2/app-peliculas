import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Favorito } from '../../../../model/favorito';
import { FavoritosService } from '../../../../services/favoritos.service';

@Component({
  selector: 'app-tarjeta-favorito',
  imports: [CommonModule],
  templateUrl: './tarjeta-favorito.component.html',
  styleUrl: './tarjeta-favorito.component.css'
})
export class TarjetaFavoritoComponent {
  @Input() favorito!: Favorito;
  @Output() eliminar = new EventEmitter<number>();

  constructor(private favoritosService: FavoritosService) { }

  get imagenUrl(): string {
    return this.favoritosService.obtenerUrlImagen(this.favorito.poster_path, 'w185');
  }

  get anio(): string {
    if (!this.favorito.release_date) return '';
    return new Date(this.favorito.release_date).getFullYear().toString();
  }

  onEliminar(): void {
    this.eliminar.emit(this.favorito.id);
  }
}
