import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PeliculasPorVerPageRoutingModule } from './peliculas-por-ver-routing.module';
import { PeliculasPorVerPage } from './peliculas-por-ver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PeliculasPorVerPageRoutingModule
  ],
  declarations: [ PeliculasPorVerPage ]
})
export class PeliculasPorVerPageModule {}
