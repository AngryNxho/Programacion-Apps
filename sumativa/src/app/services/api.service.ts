import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPeliculas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/peliculas`);
  }

  addPelicula(pelicula: { titulo: string; descripcion: string }): Observable<any> {
    return this.http.post(`${this.URL}/peliculas`, pelicula);
  }

  deletePelicula(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/peliculas/${id}`);
  }
}
