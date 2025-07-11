// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { DbTaskService } from '../services/db-task.service'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private db: DbTaskService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    await this.db.isReady()
    const active = await this.db.isSessionActive()
    if (!active) {
      this.router.navigateByUrl('/login')
      return false
    }
    return true
  }
}
