import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tasks-create',
  templateUrl: './tasks-create.page.html',
  styleUrls: ['./tasks-create.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule], // Agregar RouterModule aquí
})
export class TasksCreatePage {
  form = {
    titulo: '',
    descripcion: '',
    fechaLimite: '',
    estado: 'pendiente',
  };
  casoId: string | null = null;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.casoId = this.route.snapshot.paramMap.get('casoId');
    if (!this.casoId) {
      console.error('No hay caso asociado');
    }
  }

  async onSubmit() {
    if (!this.casoId) return;

    try {
      const data = { ...this.form, casoId: this.casoId };
      await this.tasksService.createTask(data).toPromise();
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
