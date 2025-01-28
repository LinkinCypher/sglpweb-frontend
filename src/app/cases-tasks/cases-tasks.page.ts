import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CasesService } from '../services/cases.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cases-tasks',
  standalone: true,
  templateUrl: './cases-tasks.page.html',
  styleUrls: ['./cases-tasks.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class CasesTasksPage implements OnInit {
  cases: any[] = []; // Lista de casos con tareas
  filteredCases: any[] = []; // Lista filtrada según la búsqueda
  searchQuery: string = ''; // Término de búsqueda

  constructor(
    private casesService: CasesService,
    private router: Router,
  ) {}

  async ngOnInit() {
    await this.loadCasesWithTasks();
  }

  // Cargar casos con tareas
  async loadCasesWithTasks() {
    try {
      const response = await this.casesService.getCasesWithTasks().toPromise();
      this.cases = response || []; // Asegurar que siempre sea un arreglo
      this.filteredCases = [...this.cases]; // Inicializar la lista filtrada
    } catch (error) {
      console.error('Error al cargar los casos con tareas:', error);
      this.cases = []; // Si hay un error, se asigna un arreglo vacío
      this.filteredCases = [];
    }
  }

  // Filtrar casos según el término de búsqueda
  filterCases() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCases = this.cases.filter(
      (caseItem) =>
        caseItem.numeroCaso.toLowerCase().includes(query) ||
        caseItem.nombreCliente.toLowerCase().includes(query),
    );
  }

  goTo() {
    this.router.navigate(['/login']); // Redirigir al dashboard
  }
}
