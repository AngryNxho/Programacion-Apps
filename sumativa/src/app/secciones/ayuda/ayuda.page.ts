import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
  standalone: false,
})
export class AyudaPage {
  constructor(private alertController: AlertController) {}

  async mostrarRespuesta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Respuesta',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
