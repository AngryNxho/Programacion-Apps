import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { SqliteService } from '../../services/sqlite.service';
import { InfoPeliculaService } from '../../services/info-pelicula.service';
import { register } from 'swiper/element/bundle';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

register();

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [
    trigger('staggeredFadeIn', [
      transition(':enter', [
        query('.movie-card', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger(100, [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('swiper') swiper!: ElementRef;

  swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 4
    },
    navigation: true,
    loop: true,
    loopedSlides: 4,
    loopAdditionalSlides: 2,
    loopFillGroupWithBlank: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
        slidesPerGroup: 1
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 20,
        slidesPerGroup: 2
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3
      }
    }
  };

  async ngAfterViewInit() {
    if (this.swiper) {
      const swiperEl = this.swiper.nativeElement;
      Object.assign(swiperEl, this.swiperConfig);
      await swiperEl.initialize();
    }
  }

  ionViewWillEnter() {
    this.loadFilteredMovies();
  }

  swiperSlideChanged(e: any) {
    console.log('slide changed', e);
  }

  public titulo: string = '';
  public director: string = '';
  public idioma: string = 'es';
  public peliculas: any[] = [];
  public selectedMovie: any;
  public hasSearched: boolean = false;
  public isSearching: boolean = false;
  public directores: string[] = ['Sam Raimi', 'Baran bo Odar', 'Jantje Friese'];

  recentMovies = [
    { title: 'El hombre araña (2002)', director: 'Sam Raimi', coverImage: 'assets/covers/movie1.jpg' },
    { title: 'El hombre araña 2 (2004)', director: 'Sam Raimi', coverImage: 'assets/covers/movie2.jpg' },
  ];

  recommendedMovies = [
    { title: 'Dark', director: 'Baran bo Odar, Jantje Friese', coverImage: 'assets/covers/movie3.jpg' },
    { title: '1899', director: 'Baran bo Odar, Jantje Friese', coverImage: 'assets/covers/movie4.jpg' },
  ];

  public isLoading: boolean = false;

  private searchSubject = new Subject<string>();

  constructor(
    private sqlite: SqliteService,
    private infoPeliculaService: InfoPeliculaService,
    private menuCtrl: MenuController,
    private authService: AuthService,
    private router: Router,
  ) {}

  async toggleMenu() {
    await this.menuCtrl.toggle('mainMenu');
  }

  async logout() {
    this.authService.logout();
    await this.menuCtrl.close('mainMenu');
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe(titulo => {
      this.buscarPeliculas(titulo);
    });
  }

  onSearchInput() {
    this.searchSubject.next(this.titulo);
  }

  private buscarPeliculas(titulo: string) {
    if (!titulo || titulo.trim() === '') {
      this.peliculas = [];
      this.hasSearched = false;
      return;
    }

    this.hasSearched = true;
    this.isLoading = true;
    this.infoPeliculaService.getPeliculas(titulo)
      .then(response => {
        this.peliculas = response;
      })
      .catch(error => {
        console.error('Error al obtener peliculas:', error);
        this.peliculas = [];
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  getPeliculas() {
    this.infoPeliculaService.getPeliculas(this.titulo).then(response => {
      this.peliculas = response;
    }).catch(error => {
      console.error('Error al obtener peliculas:', error);
    });
  }

  async loadFilteredMovies() {
    this.isLoading = true;
    
    const promises = this.directores.map(director =>
      this.infoPeliculaService.getPeliculas('', director, this.idioma)
        .catch(error => {
          console.error(`Error loading movies for ${director}:`, error);
          return [];
        })
    );

    try {
      const results = await Promise.all(promises);
      const allMovies = results.reduce((acc, val) => acc.concat(val), []);
      const shuffledMovies = allMovies.sort(() => Math.random() - 0.5);
      this.recentMovies = shuffledMovies.slice(0, 4);
      this.recommendedMovies = shuffledMovies.slice(4, 8);
    } catch (error) {
      console.error('Error loading filtered movies:', error);
      this.recentMovies = [];
      this.recommendedMovies = [];
    } finally {
      this.isLoading = false;
    }
  }

  selectMovie(movie: any) {
    if (this.selectedMovie?.title === movie.title) {
      this.selectedMovie = null;
    } else {
      this.selectedMovie = movie;
    }
  }

  async addToMisList() {
    if (this.selectedMovie) {
      try {
        const userId = await this.sqlite.getCurrentUserId();
        if (!userId) {
          throw new Error('No user logged in');
        }
  
        let userLists = await this.sqlite.getListasUsuario(userId);
        let listaId: number;
  
        if (!userLists || userLists.length === 0) {
          const result = await this.sqlite.createLista(userId, 'Mi Lista');
          listaId = result.changes?.lastId ?? 0;
        } else {
          listaId = userLists[0].id;
        }
  
        await this.sqlite.addMovieToLista(listaId, {
          title: this.selectedMovie.title,
          director: this.selectedMovie.director,
          coverImage: this.selectedMovie.coverImage
        });
  
        console.log('Pelicula agregado a Mis Listas:', this.selectedMovie);
        this.selectedMovie = null;
      } catch (error) {
        console.error('Error al agregar el pelicula a Mis Listas:', error);
      }
    }
  }

  handleImageError(event: any) {
    event.target.src = 'assets/covers/default.jpg';
  }

  async openCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    console.log('Image URI:', image.webPath);
  }

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
  }

  closeSearch() {
    this.hasSearched = false;
    this.peliculas = [];
    this.titulo = '';
  }
}