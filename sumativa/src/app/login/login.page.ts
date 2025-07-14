import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbTaskService } from '../services/dbtask.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  usuario: string = '';
  contrasena: string = '';

  constructor(
    private dbService: DbTaskService,
    private router: Router
  ) {}

    ngOnInit() {
    setTimeout(() => {
      this.dbService['db']?.executeSql(
        `INSERT INTO sesion_data (user_name, password, active) VALUES (?, ?, 0)`,
        ['admin', '1234']
      ).then(() => console.log('✅ Usuario admin insertado'))
       .catch(err => console.log('⚠️ Error insertando admin (puede existir ya):', err));
    }, 1000);
  }


  async iniciarSesion() {
    if (!this.dbService['db']) {
      console.log('[LOGIN] ❌ DB no inicializada');
      alert('⚠️ Error: SQLite no está inicializado.');
      return;
    }
    console.log('[LOGIN] Verificando credenciales...');
    const valido = await this.dbService.validarUsuario(this.usuario, this.contrasena);
    console.log('[LOGIN] Resultado validación:', valido);

    if (valido) {
      await this.dbService.actualizarEstadoSesion(this.usuario, true);
      await this.dbService.registerSession(this.usuario, 'token-fake');
      this.router.navigateByUrl('/home');
    } else {
      console.log('[LOGIN] ❌ Usuario o contraseña incorrectos');
      alert('Usuario o contraseña incorrectos');
    }
  }
}
