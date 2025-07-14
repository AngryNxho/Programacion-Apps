import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbTaskService } from '../services/dbtask.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  usuario = '';
  password = '';

  constructor(
    private alertController: AlertController,
    private router: Router,
    private db: DbTaskService
  ) {}

  ngOnInit(): void {}

  async login(): Promise<void> {
    const usuarioRegex = /^[a-zA-Z0-9]{3,8}$/;
    if (!usuarioRegex.test(this.usuario)) {
      return this.showAlert('Error', 'El usuario debe ser alfanumérico y tener entre 3 y 8 caracteres.');
    }

    if (this.password.length !== 4 || isNaN(Number(this.password))) {
      return this.showAlert('Error', 'La contraseña debe ser un número de 4 dígitos.');
    }

    await this.db.clearSesion();
    await this.db.guardarSesion({ usuario: this.usuario, token: this.password });


    
    this.router.navigateByUrl('/home');
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
