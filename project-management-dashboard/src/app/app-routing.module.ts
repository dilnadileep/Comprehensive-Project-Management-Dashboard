import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { DashboardComponent } from './features/pages/dashboard/dashboard.component';
import { ProjectsComponent } from './features/pages/projects/projects.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { TasksComponent } from './features/pages/tasks/tasks.component';
import { TeamMembersComponent } from './features/pages/team-members/team-members.component';
import { LoginGuard } from './core/auth/guards/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent ,canActivate: [LoginGuard]},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], 
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard], 
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard], 
  },
  {
    path: 'team-members',
    component: TeamMembersComponent,
    canActivate: [AuthGuard], 
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
