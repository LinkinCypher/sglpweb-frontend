import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasesEditPage } from './cases-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CasesEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasesEditPageRoutingModule {}
