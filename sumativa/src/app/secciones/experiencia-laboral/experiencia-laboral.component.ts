import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.scss'],
  standalone: false,
})
export class ExperienciaLaboralComponent implements OnInit {
  experiencias = [
    { empresa: 'Duoc UC', cargo: 'Tutor', anios: 1 },
    { empresa: 'Proyecto XYZ', cargo: 'Desarrollador', anios: 2 }
  ];

  ngOnInit() {
  }
}
