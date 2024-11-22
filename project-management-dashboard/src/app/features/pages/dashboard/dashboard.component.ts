import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // The sections data is no longer directly displayed on the dashboard
  // because the navigation bar handles navigation to these sections.
  message = 'Welcome to the Project Management Dashboard!';
}
