import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  isModalOpen: boolean = false;
  newProject = { name: '', description: '', deadline: '' };
  projects: any[] = [];  // Initialize projects as an empty array

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    // Fetch projects once the component is initialized
    this.projects = this.projectService.getProjects();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.newProject = { name: '', description: '', deadline: '' };  // Reset form
  }

  addProject() {
    if (this.newProject.name && this.newProject.description && this.newProject.deadline) {
      this.projectService.addProject(this.newProject);  // Use service to add project
      this.closeModal();
    } else {
      alert('Please fill all the fields.');
    }
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id);  // Pass only the id to the service
  }
}
