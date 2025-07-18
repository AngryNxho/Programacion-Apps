import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  usuario: string = '';
  password: string = '';

  constructor(private alertController: AlertController, private router: Router) {}

  async login() {
    const usuarioRegex = /^[a-zA-Z0-9]{3,8}$/;
    if (!usuarioRegex.test(this.usuario)) {
      this.showAlert('Error', 'El usuario debe ser alfanumérico y tener entre 3 y 8 caracteres.');
      return;
    }

    if (this.password.length !== 4 || isNaN(Number(this.password))) {
      this.showAlert('Error', 'La contraseña debe ser un número de 4 dígitos.');
      return;
    }

    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };

    this.router.navigate(['/home'], navigationExtras);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
