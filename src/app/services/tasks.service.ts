import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = 'http://localhost:3000/tasks';
  private usersApiUrl = 'http://localhost:3000/auth/users'; // Endpoint para usuarios

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Obtener tareas asignadas al usuario autenticado
  getAssignedTasks(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/tasks/assigned', {
      headers: this.getHeaders(),
    });
  }

  // Obtener una tarea por ID
  getTaskById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Crear una nueva tarea
  createTask(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, { headers: this.getHeaders() });
  }

  // Actualizar una tarea
  updateTask(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  // Eliminar una tarea (eliminación lógica)
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Obtener todos los casos
  getAllCases(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/cases', {
      headers: this.getHeaders(),
    });
  }

  // Obtener todos los usuarios
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersApiUrl, {
      headers: this.getHeaders(),
    });
  }
}
