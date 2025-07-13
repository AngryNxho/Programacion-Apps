import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
  standalone: false,
})
export class MisDatosComponent implements OnInit {
  nombre: string = '';
  email: string = '';
  generoFavorito: string = '';
  ciudad: string = '';

  constructor(private alertController: AlertController) {}

  async guardar() {
    localStorage.setItem('nombre', this.nombre);
    localStorage.setItem('email', this.email);
    localStorage.setItem('generoFavorito', this.generoFavorito);
    localStorage.setItem('ciudad', this.ciudad);

    const alert = await this.alertController.create({
      header: 'Perfil Actualizado',
      message: 'Tus datos han sido guardados.',
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
    this.nombre = localStorage.getItem('nombre') || '';
    this.email = localStorage.getItem('email') || '';
    this.generoFavorito = localStorage.getItem('generoFavorito') || '';
    this.ciudad = localStorage.getItem('ciudad') || '';
  }
}
