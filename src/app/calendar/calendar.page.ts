import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonDatetime } from '@ionic/angular/standalone';
import { TasksService } from '../services/tasks.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importar Router para la navegación

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class CalendarPage implements OnInit {
  tasks: any[] = []; // Lista para almacenar las tareas
  tasksLoaded = false; // Bandera para verificar si las tareas ya están cargadas
  selectedDate: string | null = null; // Fecha seleccionada (YYYY-MM-DD)
  selectedTasks: any[] = []; // Tareas filtradas para la fecha seleccionada

  constructor(private tasksService: TasksService, private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  private async loadTasks() {
    try {
      const tasks = await this.tasksService.getAssignedTasks().toPromise();
      if (tasks) {
        this.tasks = tasks.filter(
          (task) => task.estado === 'pendiente' || task.estado === 'en progreso'
        );
        console.log('Tareas cargadas (pendiente y en progreso):', this.tasks);
      } else {
        console.warn('No se cargaron tareas (respuesta indefinida).');
      }
      this.tasksLoaded = true;
    } catch (err) {
      console.error('Error al cargar las tareas:', err);
    }
  }

  highlightedDates = (isoString: string) => {
    if (!this.tasksLoaded) {
      return undefined;
    }

    const date = this.startOfDayUTC(new Date(isoString));

    const tasksForDate = this.tasks.filter((task) => {
      const taskDate = this.startOfDayUTC(new Date(task.fechaLimite));
      return taskDate.getTime() === date.getTime();
    });

    if (tasksForDate.length > 0) {
      const estado = tasksForDate[0].estado;
      switch (estado) {
        case 'pendiente':
          return {
            textColor: '#ffffff',
            backgroundColor: '#FFA500',
          };
        case 'en progreso':
          return {
            textColor: '#ffffff',
            backgroundColor: '#1E90FF',
          };
      }
    }

    return undefined;
  };

  onDateSelected(event: any) {
    const selectedISO = event.detail.value;
    const selectedDate = this.startOfDayUTC(new Date(selectedISO));
    this.selectedDate = selectedDate.toISOString().split('T')[0];

    this.selectedTasks = this.tasks.filter((task) => {
      const taskDate = this.startOfDayUTC(new Date(task.fechaLimite));
      return taskDate.getTime() === selectedDate.getTime();
    });

    console.log('Tareas para la fecha seleccionada:', this.selectedTasks);
  }

  private startOfDayUTC(date: Date): Date {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  }

  goTo() {
    this.router.navigate(['/dashboard']); // Navegar hacia el Dashboard
  }
}
