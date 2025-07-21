import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.page.html',
  styleUrls: ['./recomendaciones.page.scss'],
})
export class RecomendacionesPage {
  public titulo: string = '';
  recommendedMovies = [
    {
      title: 'Donnie Darko',
      director: 'Richard Kelly',
      coverImage: 'assets/covers/donnie.jpg',
      description: 'Donnie es un chico americano dotado de gran inteligencia e imaginación. Tras escapar milagrosamente de una muerte casi segura, comienza a sufrir alucinaciones que lo llevan a actuar como nunca hubiera imaginado y a descubrir un mundo insólito a su alrededor',
    },
    {
      title: 'Matrix',
      director: 'Lana Wachowski, Lilly Wachowski',
      coverImage: 'assets/covers/matrix.jpg',
      description: 'Un hacker se da cuenta por medio de otros rebeldes de la naturaleza de su realidad y su rol en la guerra contra los controladores.',
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
  }

  async logout() {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  onSearchInput() {
  }
}