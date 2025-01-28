import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.backendUrl}/auth`; // Base URL para autenticación

  constructor(private http: HttpClient) {}

  // Método para enviar credenciales al backend
  login(credentials: { username: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).toPromise();
  }

  // Obtener todos los casos junto con las tareas asociadas
  getCasesWithTasks() {
    return this.http.get<any[]>(`${this.apiUrl}/with-tasks`).toPromise();
  }
}
