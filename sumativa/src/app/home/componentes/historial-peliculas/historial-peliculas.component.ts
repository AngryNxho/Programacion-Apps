import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-historial-peliculas',
  templateUrl: './historial-peliculas.component.html',
  styleUrls: ['./historial-peliculas.component.scss'],
  standalone: false,
})
export class HistorialPeliculasComponent implements OnInit {
  formularioPelicula: FormGroup;
  listaPeliculas: any[] = [];
  modoEdicion = false;
  indiceEdicion: number | null = null;
  mensajeExito = '';

  constructor(private fb: FormBuilder) {
    this.formularioPelicula = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      calificacion: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  ngOnInit(): void {
    const almacenadas = localStorage.getItem('peliculasFavoritas');
    this.listaPeliculas = almacenadas ? JSON.parse(almacenadas) : [];
  }

  guardarPelicula(): void {
    if (this.formularioPelicula.invalid) return;

    const datos = this.formularioPelicula.value;

    if (this.modoEdicion && this.indiceEdicion !== null) {
      this.listaPeliculas[this.indiceEdicion] = datos;
      this.mensajeExito = 'Película editada con éxito';
    } else {
      this.listaPeliculas.push(datos);
      this.mensajeExito = 'Película agregada con éxito';
    }

    localStorage.setItem('peliculasFavoritas', JSON.stringify(this.listaPeliculas));
    this.cancelarEdicion();
    setTimeout(() => this.mensajeExito = '', 3000);
  }

  editarPelicula(index: number): void {
    const peli = this.listaPeliculas[index];
    this.formularioPelicula.patchValue(peli);
    this.modoEdicion = true;
    this.indiceEdicion = index;
  }

  eliminarPelicula(index: number): void {
    this.listaPeliculas.splice(index, 1);
    localStorage.setItem('peliculasFavoritas', JSON.stringify(this.listaPeliculas));
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.indiceEdicion = null;
    this.formularioPelicula.reset();
  }

  campoInvalido(campo: string): boolean {
    const control = this.formularioPelicula.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}
