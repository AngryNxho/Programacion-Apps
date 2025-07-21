import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BibliotecaPage } from './biblioteca.page';

const routes: Routes = [
  {
    path: '',
    component: BibliotecaPage,
  },
  {
    path: 'peliculas-vistas',
    loadChildren: () => import('./peliculas-vistas/peliculas-vistas.module').then(m => m.PeliculasVistasPageModule)
  },
  {
    path: 'peliculas-por-ver',
    loadChildren: () => import('./peliculas-por-ver/peliculas-por-ver.module').then(m => m.PeliculasPorVerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BibliotecaPageRoutingModule {}
