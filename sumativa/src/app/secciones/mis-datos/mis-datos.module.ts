import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MisDatosComponent } from './mis-datos.component';

@NgModule({
  declarations: [MisDatosComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [MisDatosComponent]
})
export class MisDatosModule {}
