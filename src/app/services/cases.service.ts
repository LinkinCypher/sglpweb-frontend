import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  private apiUrl = `${environment.backendUrl}/cases`;

  constructor(private http: HttpClient) {}

  // Obtener casos
  getCases() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear caso
  createCase(caso: any) {
    return this.http.post<any>(this.apiUrl, caso);
  }
}
