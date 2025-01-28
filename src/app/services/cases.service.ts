import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  private apiUrl = 'http://localhost:3000/cases';

  constructor(private http: HttpClient) {}

  // Obtener el token del almacenamiento local
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Listar casos
  getCases(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Crear un caso
  createCase(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, { headers: this.getHeaders() });
  }

  // Editar un caso
  updateCase(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  // Eliminar un caso
  deleteCase(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Obtener casos con tareas asociadas (sin autenticación)
  getCasesWithTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/with-tasks`);
  }
}
