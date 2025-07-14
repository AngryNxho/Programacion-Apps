// src/app/home/certificaciones/certificaciones.component.ts
import { Component, OnInit } from '@angular/core';

interface Certificado {
  nombre: string;
  fechaObtencion: string;
  vencimiento: boolean;
  fechaVencimiento: string;
}

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss'],
  standalone: false,
})
export class CertificacionesComponent implements OnInit {
  cert: Certificado = {
    nombre: '',
    fechaObtencion: '',
    vencimiento: false,
    fechaVencimiento: ''
  };
  listaCerts: Certificado[] = [];

  ngOnInit(): void {
    const stored = localStorage.getItem('listaCerts');
    this.listaCerts = stored ? JSON.parse(stored) : [];
  }

  guardarCert(): void {
    if (!this.cert.nombre || !this.cert.fechaObtencion) {
      alert('Completa Nombre y Fecha de Obtención.');
      return;
    }
    if (this.cert.vencimiento && !this.cert.fechaVencimiento) {
      alert('Si vence, indica Fecha de Vencimiento.');
      return;
    }

    this.listaCerts.push({ ...this.cert });
    localStorage.setItem('listaCerts', JSON.stringify(this.listaCerts));
    this.cert = { nombre: '', fechaObtencion: '', vencimiento: false, fechaVencimiento: '' };
  }
}
