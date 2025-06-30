import { Component, OnInit } from '@angular/core';
import { ApiService, Post } from '../../services/api.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.scss'],
  standalone: false
})
export class ApiTestComponent implements OnInit {
  posts: Post[] = [];
  cargando = true;
  error = '';
  ubicacion: { lat: number; lng: number } | null = null; 
  cargandoUbicacion = false;                             

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.fetchPosts().subscribe({
      next: data => {
        this.posts = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los posts.';
        this.cargando = false;
      }
    });
  }

  async obtenerUbicacion() {
    try {
      this.cargandoUbicacion = true;
      const pos = await Geolocation.getCurrentPosition();
      this.ubicacion = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
    } catch (e) {
      console.error('Error al obtener ubicación', e);
    } finally {
      this.cargandoUbicacion = false;
    }
  }
}
