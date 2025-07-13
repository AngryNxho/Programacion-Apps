import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular'
import { StorageService } from '../services/storage.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  usuario: string = ''
  nuevaPelicula = { titulo: '', descripcion: '' }
  peliculasFavoritas: any[] = []
  mensajeAgregado = false
  animando = false
  segmentValue: 'peliculas' | 'misdatos' | 'experiencia' | 'certificaciones' | 'favoritos' = 'peliculas';


  constructor(
    private router: Router,
    private alertController: AlertController,
    private storage: StorageService
  ) {
    const nav = this.router.getCurrentNavigation()
    this.usuario = nav?.extras.state?.['usuario'] || 'Invitado'
  }

  async ngOnInit() {
    const stored = await this.storage.get('peliculasFavoritas')
    this.peliculasFavoritas = stored ? JSON.parse(stored) : []
  }

  async agregarAFavoritos() {
    if (!this.nuevaPelicula.titulo.trim() || !this.nuevaPelicula.descripcion.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Debes completar ambos campos',
        buttons: ['OK']
      })
      await alert.present()
      return
    }
    this.animando = true
    this.peliculasFavoritas.push({ ...this.nuevaPelicula })
    await this.storage.set('peliculasFavoritas', JSON.stringify(this.peliculasFavoritas))
    this.mensajeAgregado = true
    setTimeout(() => {
      this.animando = false
      this.mensajeAgregado = false
    }, 2000)
    this.nuevaPelicula = { titulo: '', descripcion: '' }
  }
}
