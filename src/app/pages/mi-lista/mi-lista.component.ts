import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TarjetaFavoritoComponent } from './components/tarjeta-favorito/tarjeta-favorito.component';
import { Observable } from 'rxjs';
import { FavoritosService } from '../../services/favoritos.service';
import { Favorito } from '../../model/favorito';

@Component({
    selector: 'app-mi-lista',
    imports: [CommonModule, TarjetaFavoritoComponent],
    templateUrl: './mi-lista.component.html',
    styleUrl: './mi-lista.component.css'
})
export class MiListaComponent {

    favoritos!: Observable<Favorito[]>;

    constructor(private favoritosService: FavoritosService) { }

    ngOnInit(): void {
        this.cargarFavoritos();
    }

    cargarFavoritos(): void {
        this.favoritos = this.favoritosService.obtenerFavoritos();
    }

    eliminarFavorito(id: number): void {
        this.favoritosService.eliminarFavorito(id).subscribe({
            next: () => {
                this.cargarFavoritos();
            },
            error: (err) => {
                console.error('Error al eliminar favorito:', err);
                // TODO: Mostrar un mensaje de error al usuario en una proxima version.
            }
        });
    }

    trackPorId(index: number, favorito: Favorito): number {
        return favorito.id;
    }

}
