import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage {
  nombre: string = '';
  email: string = '';

  constructor(private alertController: AlertController) {}

  async guardarPerfil() {
    localStorage.setItem('nombre', this.nombre);
    localStorage.setItem('email', this.email);

    const alert = await this.alertController.create({
      header: 'Perfil Actualizado',
      message: 'Tu perfil ha sido actualizado exitosamente.',
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
    this.nombre = localStorage.getItem('nombre') || '';
    this.email = localStorage.getItem('email') || '';
  }
}
