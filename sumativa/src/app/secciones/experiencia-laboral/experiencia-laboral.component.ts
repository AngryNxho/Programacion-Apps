import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.scss'],
  standalone: false
})
export class ExperienciaLaboralComponent implements OnInit {
  experiencias: { titulo: string, descripcion: string }[] = [];
  nueva = { titulo: '', descripcion: '' };

  ngOnInit() {
    const guardado = localStorage.getItem('experienciaCine');
    this.experiencias = guardado ? JSON.parse(guardado) : [];
  }

  agregar() {
    if (!this.nueva.titulo.trim() || !this.nueva.descripcion.trim()) return;

    this.experiencias.push({ ...this.nueva });
    localStorage.setItem('experienciaCine', JSON.stringify(this.experiencias));
    this.nueva = { titulo: '', descripcion: '' };
  }
}
