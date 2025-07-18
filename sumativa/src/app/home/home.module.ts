import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

import { HistorialPeliculasComponent } from './componentes/historial-peliculas/historial-peliculas.component';
import { PeliculasDestacadasComponent } from './componentes/peliculas-destacadas/peliculas-destacadas.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    HistorialPeliculasComponent,
    PeliculasDestacadasComponent,
    PerfilUsuarioComponent
  ]
})
export class HomePageModule {}
