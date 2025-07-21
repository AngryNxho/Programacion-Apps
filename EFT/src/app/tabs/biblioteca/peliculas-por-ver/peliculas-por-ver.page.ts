import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-peliculas-por-ver',
  templateUrl: './peliculas-por-ver.page.html',
  styleUrls: ['./peliculas-por-ver.page.scss'],
})
export class PeliculasPorVerPage implements OnInit {
  toSeeMovies = [
    {
      title: 'Dark',
      director: 'Baran bo Odar, Jantje Friese',
      description: 'La desaparición de dos adolescentes...',
      cover: 'assets/covers/dark.jpg'    
    },
    {
      title: '1899',
      director: 'Baran bo Odar, Jantje Friese',
      description: 'Inmigrantes multinacionales que viajan...',
      cover: 'assets/covers/1899.jpg'
    },
  ];

  constructor() {}

  ngOnInit() {}
}
