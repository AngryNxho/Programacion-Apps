import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.scss'],
  standalone: false,
})
export class ApiTestComponent implements OnInit {
  posts: any[] = [];
  cargando = true;
  error = '';
  ubicacion: { lat: number; lng: number } | null = null;
  cargandoUbicacion = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts').subscribe({
      next: data => {
        console.log('POSTS RECIBIDOS:', data);
        this.posts = data;
        this.cargando = false;
      },
      error: err => {
        console.error('Error al cargar posts:', err);
        this.error = 'No se pudieron cargar los posts.';
        this.cargando = false;
      }
    });
  }

  async obtenerUbicacion() {
    this.cargandoUbicacion = true;

    try {
      const permisos = await Geolocation.requestPermissions();
      console.log('Permisos solicitados:', permisos);

      const pos = await Geolocation.getCurrentPosition();
      this.ubicacion = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
    } catch (e) {
      console.error('Error al obtener ubicación:', e);
      this.error = 'Error al obtener ubicación.';
    } finally {
      this.cargandoUbicacion = false;
    }
  }
}
