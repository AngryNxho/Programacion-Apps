import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
  
})
export class LoginPage {
  usuario: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ingresar() {
    const usuarioValido = this.usuario.length >= 3 && this.usuario.length <= 8;
    const passwordValida = /^\d{4}$/.test(this.password);

    if (usuarioValido && passwordValida) {
      const navExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };
      this.router.navigate(['/home'], navExtras);
    } else {
      alert('Usuario debe tener entre 3 y 8 caracteres y la clave debe ser numérica de 4 dígitos.');
    }
  }
}
