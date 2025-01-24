import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksEditPage } from './tasks-edit.page';

const routes: Routes = [
  {
    path: '',
    component: TasksEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksEditPageRoutingModule {}
