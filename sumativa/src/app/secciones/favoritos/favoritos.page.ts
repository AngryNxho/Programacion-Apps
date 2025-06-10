import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: false,
})
export class FavoritosPage implements OnInit {
  favoritos: any[] = [];

  constructor() {}

  ngOnInit() {
    this.cargarFavoritos();
  }

  ionViewWillEnter() {
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    const favoritosGuardados = localStorage.getItem('peliculasFavoritas');
    if (favoritosGuardados) {
      try {
        this.favoritos = JSON.parse(favoritosGuardados);
        console.log('Favoritos cargados:', this.favoritos);
      } catch (error) {
        console.error('Error al parsear favoritos:', error);
        this.favoritos = [];
      }
    } else {
      this.favoritos = [];
    }
  }
}
