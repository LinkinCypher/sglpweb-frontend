import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksEditPageRoutingModule } from './tasks-edit-routing.module';

import { TasksEditPage } from './tasks-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksEditPageRoutingModule
  ],
  declarations: []
})
export class TasksEditPageModule {}
