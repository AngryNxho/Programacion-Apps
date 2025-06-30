import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

import { MisDatosComponent } from '../secciones/mis-datos/mis-datos.component';
import { ExperienciaLaboralComponent } from '../secciones/experiencia-laboral/experiencia-laboral.component';
import { CertificacionesComponent } from '../secciones/certificaciones/certificaciones.component';
import { ApiTestComponent } from '../secciones/api-test/api-test.component';  // test component

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    MisDatosComponent,
    ExperienciaLaboralComponent,
    CertificacionesComponent,
    ApiTestComponent   
  ]
})
export class HomePageModule {}
