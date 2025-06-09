import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,

})
export class HomePage implements OnInit {
  usuario: string = '';
  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  fechaNacimiento: Date | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.usuario = navigation.extras.state['usuario'];
    }
  }

  mostrar() {
    alert(`Nombre: ${this.nombre}\nApellido: ${this.apellido}`);
  }

  limpiar() {
  this.nombre = '';
  this.apellido = '';
  this.nivelEducacion = '';
  this.fechaNacimiento = undefined as any;

  const inputs = document.querySelectorAll('.animate-input');
  inputs.forEach(input => {
    const element = input as HTMLElement;
    element.classList.remove('slide');
    void element.offsetWidth;
    element.classList.add('slide');
  });
}

}
