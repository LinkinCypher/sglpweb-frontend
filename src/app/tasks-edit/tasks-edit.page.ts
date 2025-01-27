import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.page.html',
  styleUrls: ['./tasks-edit.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class TasksEditPage implements OnInit {
  task: {
    titulo: string;
    descripcion: string;
    fechaLimite: string;
    estado: string;
    evidencias: string[];
    assignedTo: string; // Usuario asignado
  } = {
    titulo: '',
    descripcion: '',
    fechaLimite: '',
    estado: 'pendiente',
    evidencias: [],
    assignedTo: '', // Inicializar vacío
  };

  users: any[] = []; // Lista de usuarios cargados
  taskId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private router: Router
  ) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.loadTask();
    }
    this.loadUsers(); // Cargar usuarios al iniciar
  }

  loadTask() {
    this.tasksService.getTaskById(this.taskId!).subscribe(
      (data) => {
        this.task = data;
      },
      (error) => {
        console.error('Error al cargar la tarea:', error);
      }
    );
  }

  async loadUsers() {
    try {
      const response = await this.tasksService.getAllUsers().toPromise();
      this.users = response || []; // Si no hay usuarios, asigna un arreglo vacío
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  }

  addEvidence() {
    this.task.evidencias.push(''); // Agregar un enlace vacío
  }

  removeEvidence(index: number) {
    this.task.evidencias.splice(index, 1); // Eliminar un enlace
  }

  saveTask() {
    if (!this.taskId) return;

    this.tasksService.updateTask(this.taskId, this.task).subscribe(
      () => {
        this.router.navigate(['/tasks']); // Redirige a la lista de tareas
      },
      (error) => {
        console.error('Error al guardar la tarea:', error);
      }
    );
  }

  goTo() {
    this.router.navigate(['/tasks']); // Redirigir a la lista de tareas
  }
}
