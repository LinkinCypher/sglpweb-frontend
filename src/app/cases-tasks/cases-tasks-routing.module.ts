import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasesTasksPage } from './cases-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: CasesTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasesTasksPageRoutingModule {}
