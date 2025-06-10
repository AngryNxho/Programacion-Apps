import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  usuario: string = '';
  nuevaPelicula = {
    titulo: '',
    descripcion: ''
  };
  peliculasFavoritas: any[] = [];
  animando: boolean = false;
  mensajeAgregado: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && navigation.extras.state['usuario']) {
      this.usuario = navigation.extras.state['usuario'];
    }

    const storedPeliculas = localStorage.getItem('peliculasFavoritas');
    if (storedPeliculas) {
      this.peliculasFavoritas = JSON.parse(storedPeliculas);
    }
  }

  agregarAFavoritos() {
    if (this.nuevaPelicula.titulo.trim() && this.nuevaPelicula.descripcion.trim()) {
      this.animando = true;

      this.peliculasFavoritas.push({
        titulo: this.nuevaPelicula.titulo,
        descripcion: this.nuevaPelicula.descripcion
      });

      localStorage.setItem('peliculasFavoritas', JSON.stringify(this.peliculasFavoritas));

      this.mensajeAgregado = true;
      setTimeout(() => {
        this.animando = false;
        this.mensajeAgregado = false;
      }, 3000);

      this.nuevaPelicula = { titulo: '', descripcion: '' };
    } else {
      alert('Por favor complete ambos campos.');
    }

    console.log('Array completo:', this.peliculasFavoritas);
    console.log('localStorage:', localStorage.getItem('peliculasFavoritas'));
  }
}
