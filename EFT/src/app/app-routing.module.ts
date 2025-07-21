import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },

  // {
  // path: 'vistas',
  //   loadChildren: () => import('./biblioteca/peliculas-vistas/peliculas-vistas.module').then(m => m.PeliculasVistasPageModule)
  // },
  // {
  //   path: 'por-ver',
  //   loadChildren: () => import('./biblioteca/peliculas-por-ver/peliculas-por-ver.module').then(m => m.PeliculasPorVerPageModule)
  // }


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }