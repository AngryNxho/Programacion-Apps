import { Component } from '@angular/core';

@Component({
  selector: 'app-historial-peliculas',
  templateUrl: './historial-peliculas.component.html',
  styleUrls: ['./historial-peliculas.component.scss'],
  standalone: false
})
export class HistorialPeliculasComponent {
  historialPeliculas: any[] = [];
  nuevaPelicula = {
    titulo: '',
    descripcion: '',
    anio: '',
    calificacion: 0
  };
  mensajeAgregado = false;

  agregarAHistorial() {
    const { titulo, descripcion, anio, calificacion } = this.nuevaPelicula;

    if (titulo.trim() && descripcion.trim() && anio.trim()) {
      this.historialPeliculas.push({ titulo, descripcion, anio, calificacion });
      localStorage.setItem('historialPeliculas', JSON.stringify(this.historialPeliculas));

      this.mensajeAgregado = true;
      setTimeout(() => this.mensajeAgregado = false, 3000);

      this.nuevaPelicula = { titulo: '', descripcion: '', anio: '', calificacion: 0 };
    } else {
      alert('Completa todos los campos');
    }
  }

  ngOnInit() {
    const stored = localStorage.getItem('historialPeliculas');
    if (stored) this.historialPeliculas = JSON.parse(stored);
  }
}
