import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  sections = [
    { title: 'Projects', description: 'Manage your projects and deadlines.' },
    { title: 'Tasks', description: 'Track tasks assigned to team members.' },
    { title: 'Team Members', description: 'View and manage team members.' },
  ];
}
