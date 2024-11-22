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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    ProjectsComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
