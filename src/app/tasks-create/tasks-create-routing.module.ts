import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksCreatePage } from './tasks-create.page';

const routes: Routes = [
  {
    path: '',
    component: TasksCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksCreatePageRoutingModule {}
