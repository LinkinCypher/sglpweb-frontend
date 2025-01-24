import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksCreatePageRoutingModule } from './tasks-create-routing.module';

import { TasksCreatePage } from './tasks-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksCreatePageRoutingModule
  ],
  declarations: []
})
export class TasksCreatePageModule {}
