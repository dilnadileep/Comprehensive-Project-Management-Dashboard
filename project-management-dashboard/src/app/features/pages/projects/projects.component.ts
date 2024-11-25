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

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
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
    });
  }

  deleteProject(id: number): void {
    // Deletes a project and updates the list
    this.projectService.deleteProject(id).subscribe(() => {
      this.projects = this.projects.filter((project) => project.id !== id);
    });
  }
}
