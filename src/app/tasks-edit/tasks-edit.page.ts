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
  task: any = {
    titulo: '',
    descripcion: '',
    fechaLimite: '',
    estado: 'pendiente',
  };
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

  saveTask() {
    if (!this.taskId) return;

    this.tasksService.updateTask(this.taskId, this.task).subscribe(
      () => {
        this.router.navigate(['/tasks']);
      },
      (error) => {
        console.error('Error al guardar la tarea:', error);
      }
    );
  }
}
