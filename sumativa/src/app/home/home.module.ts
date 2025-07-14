import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { IonicModule }    from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage }               from './home.page';
import { MisDatosComponent }      from './mis-datos/mis-datos.component';
import { ExperienciaLaboralComponent } from './experiencia-laboral/experiencia-laboral.component';
import { CertificacionesComponent }    from './certificaciones/certificaciones.component';

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
    CertificacionesComponent
  ]
})
export class HomePageModule {}
