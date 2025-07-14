import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbTaskService {
  private almacenListo = false;
  private db: SQLiteObject | null = null;

  constructor(
    private platform: Platform,
    private storage: Storage,
    private sqlite: SQLite
  ) {
    this.init();
  }

  private async init(): Promise<void> {
    await this.platform.ready();
    await this.storage.create();
    this.almacenListo = true;

    if (!this.db) {
      this.db = await this.sqlite.create({
        name: 'usuarios.db',
        location: 'default'
      });

      await this.db.executeSql(`
        CREATE TABLE IF NOT EXISTS sesion_data (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_name TEXT,
          password TEXT,
          active INTEGER
        )
      `, []);
    }
  }

  async registerSession(usuario: string, token: string): Promise<void> {
    if (!this.almacenListo) await this.init();
    await this.storage.set('sesion', { usuario, token });
  }

  async hasActiveSession(): Promise<boolean> {
    if (!this.almacenListo) await this.init();
    const ses = await this.storage.get('sesion');
    return !!ses?.usuario;
  }

  async logout(): Promise<void> {
    if (!this.almacenListo) await this.init();
    await this.storage.remove('sesion');
    await this.db?.executeSql('UPDATE sesion_data SET active = 0', []);
  }

  async getSession(): Promise<{ usuario: string; token: string } | null> {
    if (!this.almacenListo) await this.init();
    return (await this.storage.get('sesion')) ?? null;
  }

  async existeSesionActiva(): Promise<boolean> {
    await this.init();
    const res = await this.db!.executeSql('SELECT * FROM sesion_data WHERE active = 1', []);
    return res.rows.length > 0;
  }

  async validarUsuario(user: string, pass: string): Promise<boolean> {
    await this.init();
    const res = await this.db!.executeSql(
      'SELECT * FROM sesion_data WHERE user_name = ? AND password = ?',
      [user, pass]
    );
    return res.rows.length > 0;
  }

  async registrarSesion(user: string, pass: string): Promise<void> {
    await this.init();
    await this.db!.executeSql('UPDATE sesion_data SET active = 0', []);
    const existe = await this.validarUsuario(user, pass);
    if (!existe) {
      await this.db!.executeSql(
        'INSERT INTO sesion_data (user_name, password, active) VALUES (?, ?, 1)',
        [user, pass]
      );
    } else {
      await this.db!.executeSql(
        'UPDATE sesion_data SET active = 1 WHERE user_name = ? AND password = ?',
        [user, pass]
      );
    }
  }

  async actualizarEstadoSesion(user: string, activo: boolean): Promise<void> {
    await this.init();
    await this.db!.executeSql(
      'UPDATE sesion_data SET active = ? WHERE user_name = ?',
      [activo ? 1 : 0, user]
    );
  }
}
