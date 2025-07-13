import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss'],
  standalone: false
})
export class CertificacionesComponent implements OnInit {
  certificaciones: string[] = [];
  nueva = '';

  ngOnInit() {
    const certs = localStorage.getItem('certificacionesCine');
    this.certificaciones = certs ? JSON.parse(certs) : [];
  }

  agregar() {
    if (!this.nueva.trim()) return;

    this.certificaciones.push(this.nueva.trim());
    localStorage.setItem('certificacionesCine', JSON.stringify(this.certificaciones));
    this.nueva = '';
  }
}
