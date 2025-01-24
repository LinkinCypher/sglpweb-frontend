import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-cases',
  standalone: true,
  templateUrl: './cases.page.html',
  styleUrls: ['./cases.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CasesPage {}
