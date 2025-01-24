import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from '../services/cases.service';
import { ToastController } from '@ionic/angular';
import { CasesEventService } from '../services/cases-event.service';

@Component({
  selector: 'app-cases-edit',
  templateUrl: './cases-edit.page.html',
  styleUrls: ['./cases-edit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CasesEditPage {
  form = {
    nombreCliente: '',
    tipo: '',
    fechaInicio: '',
    detalles: '',
  };
  caseId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private casesService: CasesService,
    private casesEventService: CasesEventService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.caseId = this.route.snapshot.paramMap.get('id');
    if (this.caseId) {
      this.loadCase();
    }
  }

  loadCase() {
    this.casesService.getCases().subscribe(
      (cases) => {
        const foundCase = cases.find((c) => c._id === this.caseId);
        if (foundCase) {
          this.form = {
            nombreCliente: foundCase.nombreCliente,
            tipo: foundCase.tipo,
            fechaInicio: foundCase.fechaInicio,
            detalles: foundCase.detalles,
          };
        }
      },
      (error) => {
        console.error('Error al cargar el caso:', error);
        this.showToast('Error al cargar el caso');
      }
    );
  }

  async onSubmit() {
    try {
      if (!this.caseId) return;
      await this.casesService.updateCase(this.caseId, this.form).toPromise();
      this.showToast('Caso actualizado exitosamente');

      // Emitir el evento para actualizar la lista de casos
      this.casesEventService.emitRefreshCases();

      // Redirigir al listado de casos
      this.router.navigate(['/cases']);
    } catch (error) {
      console.error('Error al actualizar el caso:', error);
      this.showToast('Error al actualizar el caso');
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
}
