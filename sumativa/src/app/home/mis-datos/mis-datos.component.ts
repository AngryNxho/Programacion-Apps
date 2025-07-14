// src/app/home/mis-datos/mis-datos.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
  standalone: false,
})
export class MisDatosComponent implements OnInit {
  usuario = '';
  nuevaPelicula = { titulo: '', descripcion: '' };
  peliculasFavoritas: any[] = [];
  mensajeAgregado = false;

  constructor() {}

  ngOnInit(): void {
    // obtenemos usuario de la navegación
    const nav = history.state;
    if (nav.usuario) {
      this.usuario = nav.usuario;
    }
    // cargamos favoritas de localStorage
    const stored = localStorage.getItem('peliculasFavoritas');
    if (stored) {
      this.peliculasFavoritas = JSON.parse(stored);
    }
  }

  agregarAFavoritos(): void {
    if (this.nuevaPelicula.titulo.trim() && this.nuevaPelicula.descripcion.trim()) {
      this.peliculasFavoritas.push({ 
        titulo: this.nuevaPelicula.titulo, 
        descripcion: this.nuevaPelicula.descripcion 
      });
      localStorage.setItem('peliculasFavoritas', JSON.stringify(this.peliculasFavoritas));
      this.mensajeAgregado = true;
      setTimeout(() => this.mensajeAgregado = false, 3000);
      this.nuevaPelicula = { titulo: '', descripcion: '' };
    } else {
      alert('Por favor complete ambos campos.');
    }
  }
}
