import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  animando: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.usuario = navigation.extras.state['usuario'];
    }
  }

  agregarAFavoritos() {
    if (this.nuevaPelicula.titulo.trim() && this.nuevaPelicula.descripcion.trim()) {
      this.animando = true;

      console.log('Película agregada:', this.nuevaPelicula);

      setTimeout(() => {
        this.animando = false;
      }, 600);

      this.nuevaPelicula = { titulo: '', descripcion: '' };
    } else {
      alert('Por favor complete ambos campos.');
    }
  }
}
