import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DbTaskService {
  constructor(private storage: Storage) {
    this.storage.create();
  }

  async guardarSesion(sesion: { usuario: string; token: string }): Promise<void> {
    await this.storage.set('sesion', sesion);
  }

  async obtenerSesionActiva(): Promise<{ usuario: string; token: string } | null> {
    return (await this.storage.get('sesion')) ?? null;
  }

  async clearSesion(): Promise<void> {
    await this.storage.remove('sesion');
  }
}
