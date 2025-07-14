import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbTaskService } from './services/dbtask.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

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
    private router: Router,
    private sqlite: SQLite
  ) {
    this.initializeApp();
  }

  private async initializeApp(): Promise<void> {
    await this.platform.ready();

    const db = await this.sqlite.create({
      name: 'basedatos.db',
      location: 'default'
    });

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS sesion_data (
      user_name TEXT PRIMARY KEY NOT NULL,
      password TEXT NOT NULL,
      active INTEGER NOT NULL
  );`, []);

      await db.executeSql(
    'INSERT OR IGNORE INTO sesion_data (user_name, password, active) VALUES (?, ?, ?)',
    ['admin123', '1234', 0]
  );


    const sesionActiva = await this.db.existeSesionActiva(); 

    if (sesionActiva) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
