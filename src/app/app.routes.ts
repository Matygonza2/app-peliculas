import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'detalle/:id',
        loadComponent: () => 
            import('./pages/detalle/detalle.component')
            .then((m) => m.DetalleComponent)
    }
    
];
