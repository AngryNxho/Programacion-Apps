import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-historial-peliculas',
  templateUrl: './historial-peliculas.component.html',
  styleUrls: ['./historial-peliculas.component.scss'],
  standalone: false
})
export class HistorialPeliculasComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      anio: ['', [Validators.required, Validators.min(1888)]],
      fueVista: [false],
      critica: ['']
    });
  }

  guardar() {
    if (this.form.invalid) return;
    const historial = JSON.parse(localStorage.getItem('historialPeliculas') || '[]');
    historial.push(this.form.value);
    localStorage.setItem('historialPeliculas', JSON.stringify(historial));
    this.form.reset();
  }
}
