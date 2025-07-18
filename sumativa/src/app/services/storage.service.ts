import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    this._storage = await this.storage.create();
  }

  async set(key: string, value: any): Promise<void> {
    if (!this._storage) return;
    await this._storage.set(key, value);
  }

  async get(key: string): Promise<any> {
    if (!this._storage) return null;
    return await this._storage.get(key);
  }

  async remove(key: string): Promise<void> {
    if (!this._storage) return;
    await this._storage.remove(key);
  }
}
