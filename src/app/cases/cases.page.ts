import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CasesService } from '../services/cases.service';
import { CasesEventService } from '../services/cases-event.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.page.html',
  styleUrls: ['./cases.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class CasesPage implements OnInit {
  casos: any[] = [];

  constructor(
    private casesService: CasesService, 
    private router: Router,
    private casesEventService: CasesEventService
  ) {}

  ngOnInit() {
    this.loadCases();

    // Suscribirse al evento de actualización
    this.casesEventService.refreshCases$.subscribe(() => {
      this.loadCases();
    });
  }

  // Cargar los casos del usuario autenticado
  loadCases() {
    this.casesService.getCases().subscribe(
      (data) => {
        this.casos = data;
      },
      (error) => {
        console.error('Error al cargar los casos:', error);
      }
    );
  }

  // Redirigir al formulario de creación de casos
  addCase() {
    this.router.navigate(['/cases-create']);
  }

  // Redirigir al formulario de edición de un caso
  editCase(caso: any) {
    this.router.navigate(['/cases-edit', caso._id]);
  }

  // Eliminar un caso
  deleteCase(id: string) {
    this.casesService.deleteCase(id).subscribe(
      () => {
        this.loadCases();
      },
      (error) => {
        console.error('Error al eliminar el caso:', error);
      }
    );
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }

  goTo() {
    this.router.navigate(['/dashboard']); // Redirigir al dashboard
  }
  
}
