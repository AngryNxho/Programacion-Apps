
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  usuario: string = '';
  nuevaPelicula = { titulo: '', descripcion: '' };
  peliculasFavoritas: any[] = [];
  mensajeAgregado = false;
  animando = false;
  segmentValue: 'peliculas' | 'misdatos' | 'experiencia' | 'certificaciones' = 'peliculas';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    const nav = this.router.getCurrentNavigation();
    this.usuario = nav?.extras.state?.['usuario'] || 'Invitado';
  }

  ngOnInit() {
    const stored = localStorage.getItem('peliculasFavoritas');
    this.peliculasFavoritas = stored ? JSON.parse(stored) : [];
  }

  async agregarAFavoritos() {
    if (!this.nuevaPelicula.titulo.trim() || !this.nuevaPelicula.descripcion.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Debes completar ambos campos',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    this.animando = true;
    this.peliculasFavoritas.push({ ...this.nuevaPelicula });
    localStorage.setItem('peliculasFavoritas', JSON.stringify(this.peliculasFavoritas));
    this.mensajeAgregado = true;
    setTimeout(() => {
      this.animando = false;
      this.mensajeAgregado = false;
    }, 2000);
    this.nuevaPelicula = { titulo: '', descripcion: '' };
  }
}
