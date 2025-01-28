import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasesTasksPageRoutingModule } from './cases-tasks-routing.module';

import { CasesTasksPage } from './cases-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasesTasksPageRoutingModule
  ],
  declarations: []
})
export class CasesTasksPageModule {}
