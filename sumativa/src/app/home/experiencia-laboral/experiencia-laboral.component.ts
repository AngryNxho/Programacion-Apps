// src/app/home/experiencia-laboral/experiencia-laboral.component.ts
import { Component, OnInit } from '@angular/core';

interface Experiencia {
  empresa: string;
  anoInicio: string;
  trabajando: boolean;
  anoFin: string;
  cargo: string;
}

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.scss'],
  standalone: false
})
export class ExperienciaLaboralComponent implements OnInit {
  experiencia: Experiencia = {
    empresa: '',
    anoInicio: '',
    trabajando: false,
    anoFin: '',
    cargo: ''
  };
  listaExperiencia: Experiencia[] = [];

  ngOnInit(): void {
    const stored = localStorage.getItem('listaExperiencia');
    this.listaExperiencia = stored ? JSON.parse(stored) : [];
  }

  guardarExperiencia(): void {
    if (!this.experiencia.empresa || !this.experiencia.anoInicio || !this.experiencia.cargo) {
      alert('Completa Empresa, Año inicio y Cargo.');
      return;
    }
    if (!this.experiencia.trabajando && !this.experiencia.anoFin) {
      alert('Si no estás trabajando, indica Año fin.');
      return;
    }

    this.listaExperiencia.push({ ...this.experiencia });
    localStorage.setItem('listaExperiencia', JSON.stringify(this.listaExperiencia));

    this.experiencia = {
      empresa: '',
      anoInicio: '',
      trabajando: false,
      anoFin: '',
      cargo: ''
    };
  }
}
