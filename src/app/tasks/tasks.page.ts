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
  upcomingTasksCount: number = 0;

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
    this.tasksService.getAssignedTasks().subscribe(
      (data) => {
        this.tasks = data;
        this.groupTasksByState();
        this.checkUpcomingDeadlines();
        this.checkAndNotifyUpcomingDeadlines(); // Notificaciones al cargar
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
      return (
        diffInDays > 0 &&
        diffInDays <= 2 &&
        (task.estado === 'pendiente' || task.estado === 'en progreso') // Incluir ambos estados
      );
    });
  
    this.upcomingTasksCount = upcomingTasks.length;
  }

  async checkAndNotifyUpcomingDeadlines() {
    if (this.upcomingTasksCount > 0) {
      const alert = await this.alertController.create({
        header: 'Tareas próximas a vencer',
        message: `Tienes ${this.upcomingTasksCount} tareas próximas a vencer en los próximos 2 días.`,
        buttons: ['Entendido'],
      });
      await alert.present();
    }
  }

  navigateToUpcomingTasks() {
    this.groupedTasks['pendiente'] = this.tasks.filter((task) => {
      const deadline = new Date(task.fechaLimite);
      const diffInMs = deadline.getTime() - new Date().getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      return diffInDays > 0 && diffInDays <= 2 && task.estado === 'pendiente';
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
        this.checkUpcomingDeadlines();
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

  getColorForState(state: string): string {
    switch (state) {
      case 'pendiente':
        return 'warning';
      case 'en progreso':
        return 'primary';
      case 'completada':
        return 'success';
      case 'eliminada':
        return 'medium';
      default:
        return 'light';
    }
  }

  getIconForState(state: string): string {
    switch (state.toLowerCase()) {
      case 'pendiente':
        return 'time-outline';
      case 'en progreso':
        return 'play-outline';
      case 'completada':
        return 'checkmark-circle-outline';
      case 'eliminada':
        return 'trash-outline';
      default:
        return 'help-outline';
    }
  }
}
