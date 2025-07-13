import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CertificacionesComponent } from './certificaciones.component';

@NgModule({
  declarations: [CertificacionesComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [CertificacionesComponent]
})
export class CertificacionesModule {}
