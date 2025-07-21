import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeliculasPorVerPage } from './peliculas-por-ver.page';

const routes: Routes = [
  {
    path: '',
    component: PeliculasPorVerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeliculasPorVerPageRoutingModule {}
