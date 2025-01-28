import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.page').then(m => m.LoginPage) },
  { path: 'cases', loadComponent: () => import('./cases/cases.page').then(m => m.CasesPage) },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.page').then(m => m.DashboardPage) },
  { path: 'cases-create', loadComponent: () => import('./cases-create/cases-create.page').then(m => m.CasesCreatePage) },
  { path: 'cases-edit/:id', loadComponent: () => import('./cases-edit/cases-edit.page').then(m => m.CasesEditPage) },
  { path: 'tasks', loadComponent: () => import('./tasks/tasks.page').then(m => m.TasksPage) },
  { path: 'tasks-create', loadComponent: () => import('./tasks-create/tasks-create.page').then(m => m.TasksCreatePage) },
  { path: 'tasks-edit/:id', loadComponent: () => import('./tasks-edit/tasks-edit.page').then(m => m.TasksEditPage) },
  { path: 'calendar', loadComponent: () => import('./calendar/calendar.page').then( m => m.CalendarPage) },
  { path: 'cases-tasks', loadComponent: () => import('./cases-tasks/cases-tasks.page').then( m => m.CasesTasksPage) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
