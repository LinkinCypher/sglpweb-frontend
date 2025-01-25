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
    casoId: '', // Se seleccionará del desplegable
  };
  casos: any[] = []; // Inicializado como un arreglo vacío

  constructor(
    private tasksService: TasksService,
    private toastController: ToastController,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadCases(); // Cargar casos al iniciar
  }

  async loadCases() {
    try {
      const response = await this.tasksService.getAllCases().toPromise();
      this.casos = response || []; // Si la respuesta es undefined, asigna un arreglo vacío
    } catch (error) {
      console.error('Error al cargar los casos:', error);
      this.showToast('Error al cargar los casos');
      this.casos = []; // En caso de error, asigna un arreglo vacío para evitar problemas
    }
  }

  async onSubmit() {
    if (!this.form.titulo || !this.form.fechaLimite || !this.form.casoId) {
      this.showToast('Por favor, completa todos los campos obligatorios');
      return;
    }

    try {
      await this.tasksService.createTask(this.form).toPromise();
      this.showToast('Tarea creada exitosamente');
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      this.showToast('Error al crear la tarea');
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
    this.router.navigate(['/tasks']); // Redirigir al dashboard
  }
}
