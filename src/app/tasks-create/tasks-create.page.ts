import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tasks-create',
  templateUrl: './tasks-create.page.html',
  styleUrls: ['./tasks-create.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class TasksCreatePage implements OnInit {
  form: {
    titulo: string;
    descripcion: string;
    fechaLimite: string;
    casoId: string;
    evidencias: string[];
    assignedTo: string; // Usuario al que se asigna la tarea
  } = {
    titulo: '',
    descripcion: '',
    fechaLimite: '',
    casoId: '',
    evidencias: [],
    assignedTo: '', // Inicialmente vacío
  };

  casos: any[] = []; // Lista de casos cargados
  usuarios: any[] = []; // Lista de usuarios disponibles

  constructor(
    private tasksService: TasksService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCases(); // Cargar los casos
    this.loadUsers(); // Cargar los usuarios
  }

  async loadCases() {
    try {
      const response = await this.tasksService.getAllCases().toPromise();
      this.casos = response || [];
    } catch (error) {
      console.error('Error al cargar los casos:', error);
      this.showToast('No se pudieron cargar los casos. Inténtalo más tarde.');
    }
  }

  async loadUsers() {
    try {
      const response = await this.tasksService.getAllUsers().toPromise();
      this.usuarios = response || [];
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
      this.showToast('No se pudieron cargar los usuarios. Inténtalo más tarde.');
    }
  }

  addEvidence() {
    this.form.evidencias.push('');
  }

  removeEvidence(index: number) {
    this.form.evidencias.splice(index, 1);
  }

  async onSubmit() {
    if (!this.form.titulo || !this.form.fechaLimite || !this.form.casoId || !this.form.assignedTo) {
      this.showToast('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      await this.tasksService.createTask(this.form).toPromise();
      this.showToast('Tarea creada exitosamente');
      this.router.navigate(['/tasks']); // Redirigir a la lista de tareas
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      this.showToast('No se pudo crear la tarea. Inténtalo más tarde.');
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }

  goTo() {
    this.router.navigate(['/tasks']); // Redirigir a la lista de tareas
  }
}
