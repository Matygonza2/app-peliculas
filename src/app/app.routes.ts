import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/home/home.component')
                .then((m) => m.HomeComponent)
    },
    {
        path: 'buscar',
        loadComponent: () =>
            import('./pages/buscar/buscar.component')
                .then((m) => m.BuscarComponent)
    },
    {
        path: 'detalle/:id',
        loadComponent: () =>
            import('./pages/detalle/detalle.component')
                .then((m) => m.DetalleComponent)
    },
    {
        path: 'mi-lista',
        loadComponent: () =>
            import('./pages/mi-lista/mi-lista.component')
                .then((m) => m.MiListaComponent)
    },
    { path: '**', redirectTo: '' }
];
