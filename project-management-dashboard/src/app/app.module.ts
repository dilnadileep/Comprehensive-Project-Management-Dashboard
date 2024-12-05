import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { FormsModule } from '@angular/forms'; 
import { DashboardComponent } from './features/pages/dashboard/dashboard.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProjectsComponent } from './features/pages/projects/projects.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TasksComponent } from './features/pages/tasks/tasks.component';
import { TeamMembersComponent } from './features/pages/team-members/team-members.component';
import { ProjectNamePipe } from './shared/pipes/project-name.pipe';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { TaskNamePipe } from './shared/pipes/task-name.pipe';
import { TeamMemberNamePipe } from './shared/pipes/team-member-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    ProjectsComponent,
    TasksComponent,
    TeamMembersComponent,
    ProjectNamePipe,
    TaskNamePipe,
    TeamMemberNamePipe,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [ProjectNamePipe], // Export to use in other modules

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
