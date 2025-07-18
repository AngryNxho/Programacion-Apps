import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    MatToolbarModule,
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
