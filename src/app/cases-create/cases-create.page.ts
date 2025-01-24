import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CasesService } from '../services/cases.service';
import { ToastController } from '@ionic/angular';
import { CasesEventService } from '../services/cases-event.service';

@Component({
  selector: 'app-cases-create',
  templateUrl: './cases-create.page.html',
  styleUrls: ['./cases-create.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CasesCreatePage {
  form = {
    nombreCliente: '',
    tipo: '',
    fechaInicio: '',
    detalles: '',
  };

  constructor(
    private casesService: CasesService,
    private casesEventService: CasesEventService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async onSubmit() {
    try {
      await this.casesService.createCase(this.form).toPromise();
      this.showToast('Caso creado exitosamente');

      // Emitir el evento para actualizar la lista de casos
      this.casesEventService.emitRefreshCases();

      // Redirigir al listado de casos
      this.router.navigate(['/cases']);
    } catch (error) {
      console.error('Error al crear el caso:', error);
      this.showToast('Error al crear el caso');
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
    this.router.navigate(['/cases']); // Redirigir al dashboard
  }
}
