import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonDatetime } from '@ionic/angular/standalone';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class CalendarPage implements OnInit {
  tasks: any[] = []; // Lista para almacenar las tareas

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() {
    this.tasksService.getAssignedTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        console.log('Tareas cargadas:', this.tasks);
      },
      error: (err) => {
        console.error('Error al cargar las tareas:', err);
      },
    });
  }

  highlightedDates = (isoString: string) => {
    const date = new Date(isoString).toISOString().split('T')[0]; // Obtener la fecha en formato YYYY-MM-DD

    // Verificar si hay tareas para esta fecha
    const tasksForDate = this.tasks.filter((task) =>
      new Date(task.fechaLimite).toISOString().startsWith(date)
    );

    // Si hay tareas, aplicar colores según el estado
    if (tasksForDate.length > 0) {
      const estado = tasksForDate[0].estado; // Usamos el estado de la primera tarea como ejemplo
      switch (estado) {
        case 'pendiente':
          return {
            textColor: '#ffffff',
            backgroundColor: '#FFA500', // Naranja para tareas pendientes
          };
        case 'eliminada':
          return {
            textColor: '#ffffff',
            backgroundColor: '#FF0000', // Rojo para tareas eliminadas
          };
        default:
          return {
            textColor: '#ffffff',
            backgroundColor: '#008000', // Verde para otros estados
          };
      }
    }

    // Si no hay tareas, devolver undefined para no resaltar
    return undefined;
  };
}
