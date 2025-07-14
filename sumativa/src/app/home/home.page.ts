import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  peliculas: { id: number; titulo: string; descripcion: string }[] = [];
  nuevaPelicula = { titulo: '', descripcion: '' };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    this.api.getPeliculas().subscribe((data) => {
      this.peliculas = data;
    });
  }

  agregarPelicula(): void {
    const { titulo, descripcion } = this.nuevaPelicula;
    if (!titulo.trim() || !descripcion.trim()) return;

    this.api.addPelicula({ titulo, descripcion }).subscribe(() => {
      this.nuevaPelicula = { titulo: '', descripcion: '' };
      this.cargarPeliculas();
    });
  }

  eliminarPelicula(id: number): void {
    this.api.deletePelicula(id).subscribe(() => {
      this.cargarPeliculas();
    });
  }
}
