// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const isAuthenticated = await this.authService.isAuthenticated();
    const currentRoute = this.router.url;
  
    if (isAuthenticated) {
      return true; // Permite el acceso si la sesión está activa
    } else {
      // Redirige a inicio-session solo si no estás ya en esa página
      if (currentRoute !== '/inicio-session') {
        return this.router.createUrlTree(['/inicio-session']);
      }
      return false; // Impide la activación si ya estás en inicio-session
    }
  }}