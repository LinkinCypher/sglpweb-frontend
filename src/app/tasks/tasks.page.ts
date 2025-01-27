import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class TasksPage implements OnInit {
  tasks: any[] = [];

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadTasks(); // Cargar tareas al inicializar
  }

  ionViewWillEnter() {
    this.loadTasks(); // Recargar tareas al entrar en la página
  }

  loadTasks() {
    this.tasksService.getTasksByUser().subscribe(
      (data) => {
        this.tasks = data; // Asigna las tareas al arreglo local
      },
      (error) => {
        console.error('Error al cargar las tareas:', error);
      }
    );
  }

  addTask() {
    this.router.navigate(['/tasks-create']);
  }

  editTask(task: any) {
    this.router.navigate(['/tasks-edit', task._id]);
  }

  async confirmDelete(taskId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => this.deleteTask(taskId),
        },
      ],
    });

    await alert.present();
  }

  deleteTask(taskId: string) {
    this.tasksService.deleteTask(taskId).subscribe(
      (updatedTask) => {
        // Encuentra la tarea y actualiza su estado en la lista local
        const index = this.tasks.findIndex((task) => task._id === updatedTask._id);
        if (index !== -1) {
          this.tasks[index].estado = updatedTask.estado; // Actualiza el estado localmente
        }
      },
      (error) => {
        console.error('Error al eliminar la tarea:', error);
      }
    );
  }

  logout() {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }

  goTo() {
    this.router.navigate(['/dashboard']);
  }
}
