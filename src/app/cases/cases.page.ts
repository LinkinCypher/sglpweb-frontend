import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CasesService } from '../services/cases.service';

@Component({
  selector: 'app-cases',
  standalone: true,
  templateUrl: './cases.page.html',
  styleUrls: ['./cases.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CasesPage implements OnInit {
  casos: any[] = []; // Lista de casos
  isModalOpen = false; // Controla si el modal está abierto o cerrado
  newCase = {
    nombre: '',
    tipo: '',
    fechaInicio: '',
  }; // Datos del nuevo caso

  constructor(private casesService: CasesService) {}

  ngOnInit() {
    this.loadCases();
  }

  // Método para cargar los casos desde el servicio
  loadCases() {
    this.casesService.getCases().subscribe({
      next: (data) => {
        console.log('Casos cargados:', data);
        this.casos = data;
      },
      error: (err) => {
        console.error('Error al cargar casos:', err);
      },
    });
  }

  // Abrir el modal
  openModal() {
    this.isModalOpen = true;
  }

  // Cerrar el modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Crear un nuevo caso
  createCase() {
    this.casesService.createCase(this.newCase).subscribe({
      next: (data) => {
        console.log('Caso creado:', data);
        this.casos.push(data); // Agregar el caso a la lista
        this.closeModal(); // Cerrar el modal
      },
      error: (err) => {
        console.error('Error al crear caso:', err);
      },
    });
  }
}
