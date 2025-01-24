import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.page').then(m => m.LoginPage) },
  { path: 'cases', loadComponent: () => import('./cases/cases.page').then(m => m.CasesPage) },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.page').then(m => m.DashboardPage) },
  { path: 'cases-create', loadComponent: () => import('./cases-create/cases-create.page').then(m => m.CasesCreatePage) },
  { path: 'cases-edit/:id', loadComponent: () => import('./cases-edit/cases-edit.page').then(m => m.CasesEditPage) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
