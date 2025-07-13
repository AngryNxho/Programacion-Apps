import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./secciones/perfil/perfil.module').then(
        (m) => m.PerfilPageModule
      ),
  },
  {
    path: 'favoritos',
    loadChildren: () =>
      import('./secciones/favoritos/favoritos.module').then(
        (m) => m.FavoritosPageModule
      ),
  },
  {
    path: 'ayuda',
    loadChildren: () =>
      import('./secciones/ayuda/ayuda.module').then(
        (m) => m.AyudaPageModule
      ),
  },
  {
    path: 'mis-datos',
    loadChildren: () =>
      import('./secciones/mis-datos/mis-datos.module').then(
        (m) => m.MisDatosModule
      ),
  },
  {
    path: 'experiencia-laboral',
    loadChildren: () =>
      import('./secciones/experiencia-laboral/experiencia-laboral.module').then(
        (m) => m.ExperienciaLaboralModule
      ),
  },
  {
    path: 'certificaciones',
    loadChildren: () =>
      import('./secciones/certificaciones/certificaciones.module').then(
        (m) => m.CertificacionesModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
