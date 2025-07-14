import { Component } from '@angular/core';
import { Platform }   from '@ionic/angular';
import { Router }     from '@angular/router';
import { DbTaskService } from './services/dbtask.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private db: DbTaskService,
    private router: Router
  ) {
    this.initializeApp();
  }

  private async initializeApp(): Promise<void> {
    await this.platform.ready();

    await this.db.clearSesion();
    console.log('⏳ Sesión borrada al arrancar');

    this.router.navigateByUrl('/home');
  }
}
