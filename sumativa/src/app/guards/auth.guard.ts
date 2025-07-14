// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { DbTaskService } from '../services/dbtask.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private db: DbTaskService,
    private router: Router
  ) {}

  async canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const activa = await this.db.hasActiveSession();
    if (activa) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}
