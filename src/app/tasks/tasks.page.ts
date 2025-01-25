import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
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

  constructor(private tasksService: TasksService, private router: Router) {}

  ngOnInit() {
    this.loadTasks(); // Cargar tareas al inicializar
  }

  loadTasks() {
    this.tasksService.getTasksByUser().subscribe(
      (data) => {
        this.tasks = data; // Asignar las tareas obtenidas
      },
      (error) => {
        console.error('Error al cargar las tareas:', error);
      }
    );
  }

  // Redirige a la página de creación
  addTask() {
    this.router.navigate(['/tasks-create']);
  }

  // Navegar a la página de edición
  editTask(task: any) {
    this.router.navigate(['/tasks-edit', task._id]);
  }

  goTo() {
    this.router.navigate(['/dashboard']); // Redirigir al dashboard
  }
}
