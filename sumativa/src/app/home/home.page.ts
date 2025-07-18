import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Pelicula {
  titulo: string;
  descripcion: string;
  calificacion: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  usuario = '';
  segmentoSeleccionado: 'peliculas' | 'experiencia' | 'certificaciones' | 'datos' = 'peliculas';

  nuevaPelicula: Pelicula = {
    titulo: '',
    descripcion: '',
    calificacion: 0
  };

  peliculasFavoritas: Pelicula[] = [];
  mensajeAgregado = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['usuario']) {
      this.usuario = nav.extras.state['usuario'];
    }
    const stored = localStorage.getItem('peliculasFavoritas');
    if (stored) {
      this.peliculasFavoritas = JSON.parse(stored);
    }
  }

  agregarAFavoritos() {
    const { titulo, descripcion, calificacion } = this.nuevaPelicula;
    if (!titulo.trim() || !descripcion.trim()) {
      return alert('Por favor complete título y descripción.');
    }

    this.peliculasFavoritas.push({ titulo, descripcion, calificacion });
    localStorage.setItem('peliculasFavoritas', JSON.stringify(this.peliculasFavoritas));

    this.mensajeAgregado = true;
    setTimeout(() => this.mensajeAgregado = false, 2000);

    this.nuevaPelicula = { titulo: '', descripcion: '', calificacion: 3 };
  }
}
