import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects', 
  templateUrl: './projects.component.html', 
  styleUrls: ['./projects.component.scss'], 
})
export class ProjectsComponent implements OnInit {
  projects: any[] = []; // Holds the list of projects fetched from the service
  isModalOpen: boolean = false;
  newProject = { name: '', description: '', deadline: '' };
  minDate: string = ''; // This will store the minimum allowed date

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    // Set the minDate to today's date in the format YYYY-MM-DD
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    // Initializes the component by fetching the list of projects
    this.projectService.getProjects().subscribe((data: any[]) => {
      this.projects = data;
    });
  }

  openModal(): void {
    // Opens the modal for adding a new project
    this.isModalOpen = true;
  }

  closeModal(): void {
    // Closes the modal
    this.isModalOpen = false;
  }

  addProject(): void {
    // Adds a new project and updates the list
    this.projectService.addProject(this.newProject).subscribe((project) => {
      this.projects.push(project);
      this.closeModal();
      // Reset the form fields after adding a project
      this.newProject = { name: '', description: '', deadline: '' };
    });
  }

  deleteProject(id: number): void {
    // Deletes a project and updates the list
    this.projectService.deleteProject(id).subscribe(() => {
      this.projects = this.projects.filter((project) => project.id !== id);
    });
  }
}
