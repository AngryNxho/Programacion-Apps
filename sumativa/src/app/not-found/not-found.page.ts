import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `<ion-header><ion-toolbar><ion-title>Página no encontrada</ion-title></ion-toolbar></ion-header>
             <ion-content class="ion-padding">
               <h2>404</h2>
               <p>La página que buscas no existe.</p>
             </ion-content>`,
  standalone: false,
})
export class NotFoundPage {}
