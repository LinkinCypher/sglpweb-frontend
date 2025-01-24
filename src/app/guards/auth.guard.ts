import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // Si el token existe, permite el acceso
      return true;
    }

    // Si no hay token, redirige al login
    this.router.navigate(['/login']);
    return false;
  }
}
