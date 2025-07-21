import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-peliculas-por-ver',
  templateUrl: './peliculas-por-ver.page.html',
  styleUrls: ['./peliculas-por-ver.page.scss'],
})
export class PeliculasPorVerPage implements OnInit {
  toSeeMovies = [
    { title: 'Dark', director: 'Baran bo Odar, Jantje Friese', description: 'La desaparición de dos adolescentes en un pueblo alemán desata una saga familiar entre cuatro familiar con giros sobrenaturales.' },
    { title: '1899', director: 'Baran bo Odar, Jantje Friese', description: 'Inmigrantes multinacionales que viajan del viejo continente al nuevo, se encuentran con un acertijo de pesadilla a bordo de un segundo barco a la deriva en mar abierto.' },
  ];

  constructor() {}

  ngOnInit() {}
}
