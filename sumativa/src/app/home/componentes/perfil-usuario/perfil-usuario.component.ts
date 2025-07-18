import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
  standalone: false,
})
export class PerfilUsuarioComponent {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });

    const datosGuardados = localStorage.getItem('datosPerfil');
    if (datosGuardados) {
      this.formulario.setValue(JSON.parse(datosGuardados));
    }
  }

  guardar() {
    if (this.formulario.valid) {
      localStorage.setItem('datosPerfil', JSON.stringify(this.formulario.value));
      alert('Datos guardados correctamente');
    }
  }
}
