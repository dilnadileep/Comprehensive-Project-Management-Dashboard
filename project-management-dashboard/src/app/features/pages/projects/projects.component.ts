import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import Swal from 'sweetalert2'; // Import SweetAlert2

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
  isPastDate(): boolean {
    if (!this.newProject.deadline) return false;
  
    const enteredDate = new Date(this.newProject.deadline).setHours(0, 0, 0, 0); // Remove time part
    const todayDate = new Date(this.minDate).setHours(0, 0, 0, 0); // Today at midnight
    return enteredDate < todayDate;
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;  // Store projects
    });
  }
  openModal(): void {
    // Opens the modal for adding a new project
    this.isModalOpen = true;
  }

  closeModal(): void {
    // Closes the modal
    this.isModalOpen = false;
    this.newProject = { name: '', description: '', deadline: '' };
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
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this project?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.deleteProject(id).subscribe(() => {
          this.loadProjects();
          Swal.fire('Deleted!', 'Your project has been deleted.', 'success');
        });
      }
    });
  }
}
