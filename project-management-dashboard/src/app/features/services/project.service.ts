import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: { id: number; name: string; description: string; deadline: string }[] = [];

  constructor() {}

  // Get all projects
  getProjects() {
    return this.projects;
  }

  // Add a new project
  addProject(project: { name: string; description: string; deadline: string }) {
    const newProject = {
      id: this.projects.length + 1,  // Generate a unique id based on length (or use a better method)
      ...project
    };
    this.projects.push(newProject);
  }

  // Delete a project by id
  deleteProject(id: number) {
    const index = this.projects.findIndex(project => project.id === id);
    if (index > -1) {
      this.projects.splice(index, 1);
    }
  }
}

