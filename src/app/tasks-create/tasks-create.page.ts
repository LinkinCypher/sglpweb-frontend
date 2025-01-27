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
  form = {
    titulo: '',
    descripcion: '',
    fechaLimite: '',
    casoId: '', // Caso relacionado con la tarea
  };
  casos: any[] = []; // Lista de casos cargados

  constructor(
    private tasksService: TasksService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCases(); // Cargar los casos al iniciar
  }

  async loadCases() {
    try {
      const response = await this.tasksService.getAllCases().toPromise();
      this.casos = response || []; // Si no hay casos, asigna un arreglo vacío
    } catch (error) {
      console.error('Error al cargar los casos:', error);
      this.showToast('No se pudieron cargar los casos. Inténtalo más tarde.');
    }
  }

  async onSubmit() {
    if (!this.form.titulo || !this.form.fechaLimite || !this.form.casoId) {
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
