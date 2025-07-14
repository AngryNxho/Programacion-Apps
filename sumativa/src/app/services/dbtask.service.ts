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

      // 1) Creamos la tabla
      await this.db.executeSql(`
        CREATE TABLE IF NOT EXISTS sesion_data (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_name TEXT,
          password TEXT,
          active INTEGER
        )
      `, []);

      // 2) Insertamos el usuario por defecto 'admin' / '1234'
      await this.db.executeSql(
        'INSERT OR IGNORE INTO sesion_data (user_name, password, active) VALUES (?, ?, ?)',
        ['admin', '1234', 0]
      )
      .then(() => console.log('✅ Usuario admin insertado'))
      .catch(err => console.error('❌ Error insertando admin', err));
    }
  }

  /** Guarda sesión en Storage (inofficial) */
  async registerSession(usuario: string, token: string): Promise<void> {
    if (!this.almacenListo) await this.init();
    await this.storage.set('sesion', { usuario, token });
  }

  /** ¿Hay sesión guardada en Storage? */
  async hasActiveSession(): Promise<boolean> {
    if (!this.almacenListo) await this.init();
    const ses = await this.storage.get('sesion');
    return !!ses?.usuario;
  }

  /** Cierra sesión (Storage + SQLite) */
  async logout(): Promise<void> {
    if (!this.almacenListo) await this.init();
    await this.storage.remove('sesion');
    await this.db?.executeSql('UPDATE sesion_data SET active = 0', []);
  }

  /** Lee la sesión de Storage */
  async getSession(): Promise<{ usuario: string; token: string } | null> {
    if (!this.almacenListo) await this.init();
    return (await this.storage.get('sesion')) ?? null;
  }

  /** ¿Alguna fila activa en SQLite? */
  async existeSesionActiva(): Promise<boolean> {
    await this.init();
    const res = await this.db!.executeSql(
      'SELECT * FROM sesion_data WHERE active = 1',
      []
    );
    return res.rows.length > 0;
  }

  /** Valida usuario+pass contra SQLite */
  async validarUsuario(user: string, pass: string): Promise<boolean> {
    await this.init();

    // Debug: imprime lo que hay en la tabla
    const debug = await this.db!.executeSql('SELECT * FROM sesion_data', []);
    for (let i = 0; i < debug.rows.length; i++) {
      const fila = debug.rows.item(i);
      console.log(
        `🧾 DB fila #${i}: ${fila.user_name} / ${fila.password} (active=${fila.active})`
      );
    }

    // La consulta real
    const res = await this.db!.executeSql(
      'SELECT * FROM sesion_data WHERE user_name = ? AND password = ?',
      [user, pass]
    );
    return res.rows.length > 0;
  }

  /** Marca sesión en SQLite (insert o update) */
  async registrarSesion(user: string, pass: string): Promise<void> {
    await this.init();
    // Desactivamos todas las sesiones
    await this.db!.executeSql('UPDATE sesion_data SET active = 0', []);
    const existe = await this.validarUsuario(user, pass);
    if (!existe) {
      // Si no existía, lo insertamos como activo
      await this.db!.executeSql(
        'INSERT INTO sesion_data (user_name, password, active) VALUES (?, ?, 1)',
        [user, pass]
      );
    } else {
      // Si ya existía, sólo activamos ese registro
      await this.db!.executeSql(
        'UPDATE sesion_data SET active = 1 WHERE user_name = ? AND password = ?',
        [user, pass]
      );
    }
  }

  /** Actualiza sólo el campo active de un usuario concreto */
  async actualizarEstadoSesion(user: string, activo: boolean): Promise<void> {
    await this.init();
    await this.db!.executeSql(
      'UPDATE sesion_data SET active = ? WHERE user_name = ?',
      [activo ? 1 : 0, user]
    );
  }
}
