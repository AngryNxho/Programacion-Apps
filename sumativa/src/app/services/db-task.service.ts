// src/app/services/db-task.service.ts
import { Injectable } from '@angular/core'
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class DbTaskService {
  private dbReady = new BehaviorSubject(false)
  private db!: SQLiteObject


  constructor(private sqlite: SQLite) {
    this.init()
  }

  private async init() {
    this.db = await this.sqlite.create({ name: 'app.db', location: 'default' })
    await this.db.executeSql(
      `CREATE TABLE IF NOT EXISTS sesion_data (
         id INTEGER PRIMARY KEY,
         user_name TEXT,
         password TEXT,
         active INTEGER
       )`,
      []
    )
    this.dbReady.next(true)
  }

  isReady(): Promise<boolean> {
    return new Promise(resolve =>
      this.dbReady.subscribe(r => { if (r) resolve(true) })
    )
  }

  async login(user: string, pass: string) {
    await this.db.executeSql(
      'INSERT OR REPLACE INTO sesion_data (id, user_name, password, active) VALUES (1, ?, ?, 1)',
      [user, pass]
    )
  }

  async logout() {
    await this.db.executeSql(
      'UPDATE sesion_data SET active = 0 WHERE id = 1',
      []
    )
  }

  async isSessionActive(): Promise<boolean> {
    const res = await this.db.executeSql(
      'SELECT active FROM sesion_data WHERE id = 1',
      []
    )
    return res.rows.length > 0 && res.rows.item(0).active === 1
  }
}
