import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-peliculas-vistas',
  templateUrl: './peliculas-vistas.page.html',
  styleUrls: ['./peliculas-vistas.page.scss'],
})
export class PeliculasVistasPage implements OnInit {
  seenMovies = [
    { title: 'El hombre araña (2002)',
      director: 'Sam Raimi',
      description:
        'Cuando es mordido por una araña modificada genéticamente, un estudiante tímido de secundaria adquiere habilidades de araña que eventualmente debe usar para luchar contra el mal como un superhéroe, después de que la tragedia tocara a su familia.' },
    { title: 'El hombre araña 2 (2004)',
      director: 'Sam Raimi',
      description:
        'Peter Parker está plagado de problemas en su fallida vida personal mientras lucha contra un científico brillante llamado Doctor Otto Octavius.' },
  ];

  constructor() {}

  ngOnInit() {}
}
