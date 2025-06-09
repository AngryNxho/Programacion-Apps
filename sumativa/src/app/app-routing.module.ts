import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./secciones/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./secciones/favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./secciones/ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
