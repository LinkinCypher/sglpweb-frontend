import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { AlertController, ToastController } from '@ionic/angular';
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
  groupedTasks: { [key: string]: any[] } = {
    pendiente: [],
    'en progreso': [],
    completada: [],
    eliminada: [],
  };
  upcomingTasksCount: number = 0; // Contador de tareas próximas a vencer

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  ionViewWillEnter() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasksService.getTasksByUser().subscribe(
      (data) => {
        this.tasks = data;
        this.groupTasksByState(); // Agrupar las tareas por estado
        this.checkUpcomingDeadlines(); // Verificar fechas próximas
      },
      (error) => {
        console.error('Error al cargar las tareas:', error);
        this.showToast('Error al cargar las tareas', 'danger');
      }
    );
  }

  groupTasksByState() {
    this.groupedTasks = {
      pendiente: [],
      'en progreso': [],
      completada: [],
      eliminada: [],
    };

    this.tasks.forEach((task) => {
      this.groupedTasks[task.estado]?.push(task);
    });
  }

  checkUpcomingDeadlines() {
    const now = new Date();
    const upcomingTasks = this.tasks.filter((task) => {
      const deadline = new Date(task.fechaLimite);
      const diffInMs = deadline.getTime() - now.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      return diffInDays > 0 && diffInDays <= 2 && task.estado === 'pendiente';
    });

    this.upcomingTasksCount = upcomingTasks.length; // Actualizar el contador
  }

  navigateToUpcomingTasks() {
    // Opcional: Filtrar las tareas próximas a vencer dentro de las pendientes
    this.groupedTasks['pendiente'] = this.groupedTasks['pendiente'].filter((task) => {
      const deadline = new Date(task.fechaLimite);
      const diffInMs = deadline.getTime() - new Date().getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      return diffInDays > 0 && diffInDays <= 2;
    });
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
        this.tasks = this.tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
        this.groupTasksByState();
        this.checkUpcomingDeadlines(); // Actualizar contador tras eliminación
        this.showToast('Tarea eliminada exitosamente', 'success');
      },
      (error) => {
        console.error('Error al eliminar la tarea:', error);
        this.showToast('Error al eliminar la tarea', 'danger');
      }
    );
  }

  async showToast(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color,
    });
    await toast.present();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  goTo() {
    this.router.navigate(['/dashboard']);
  }
}
