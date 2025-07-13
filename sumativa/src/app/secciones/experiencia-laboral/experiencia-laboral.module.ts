import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ExperienciaLaboralComponent } from './experiencia-laboral.component';

@NgModule({
  declarations: [ExperienciaLaboralComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [ExperienciaLaboralComponent]
})
export class ExperienciaLaboralModule {}
