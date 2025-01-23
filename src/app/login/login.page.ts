import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [FormsModule, CommonModule, IonicModule],
})
export class LoginPage {
  credentials = {
    username: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    try {
      console.log('Iniciando sesión:', this.credentials);
      const response = await this.authService.login(this.credentials);

      if (response?.token) {
        console.log('Token recibido:', response.token);

        // Guardar el token en el almacenamiento local
        localStorage.setItem('token', response.token);

        // Redirigir al dashboard
        this.router.navigate(['/dashboard']);
      } else {
        throw new Error('Token no recibido');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Credenciales inválidas o error en el servidor.');
    }
  }
}
