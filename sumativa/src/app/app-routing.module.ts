import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'perfil',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./secciones/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'favoritos',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./secciones/favoritos/favoritos.module').then(m => m.FavoritosPageModule)
  },
  {
    path: 'ayuda',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./secciones/ayuda/ayuda.module').then(m => m.AyudaPageModule)
  },

  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
