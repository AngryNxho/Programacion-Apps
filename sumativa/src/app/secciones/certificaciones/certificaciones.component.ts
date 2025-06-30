import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss'],
  standalone: false,
})
export class CertificacionesComponent implements OnInit {
  certs = [
    { titulo: 'Ionic Fundamentals', fecha: 'Jun 2025' },
    { titulo: 'Angular Avanzado', fecha: 'May 2025' }
  ];

  ngOnInit() {}
}
