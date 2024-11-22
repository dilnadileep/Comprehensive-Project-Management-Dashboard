import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { DashboardComponent } from './features/pages/dashboard/dashboard.component';
import { ProjectsComponent } from './features/pages/projects/projects.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],  // Protect the dashboard route
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard],  // Protect the projects route
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
