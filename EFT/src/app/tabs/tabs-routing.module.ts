import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './tabs.component';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../pages/perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'biblioteca',
        children: [
          {
            path: '',
            loadChildren: () => import('./biblioteca/biblioteca.module').then(m => m.BibliotecaPageModule)
          },
        ]
      },
      {
        path: 'recomendaciones',
        loadChildren: () => import('./recomendaciones/recomendaciones.module').then(m => m.RecomendacionesPageModule)
      },
      {
        path: 'mis-listas',
        loadChildren: () => import('./mis-listas/mis-listas.module').then(m => m.MisListasPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },

    {
    path: 'peliculas-vistas',
    loadChildren: () => import('./biblioteca/peliculas-vistas/peliculas-vistas.module').then(m => m.PeliculasVistasPageModule)
  },
  {
    path: 'peliculas-por-ver',
    loadChildren: () => import('./biblioteca/peliculas-por-ver/peliculas-por-ver.module').then(m => m.PeliculasPorVerPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule {}