import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';  // Import your project service

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  projects: any[] = [];  // Hold the list of projects
  filteredTasks: any[] = [];
  isModalOpen: boolean = false;
  taskStatuses = ['Pending', 'Completed'];

  isEditModalOpen: boolean = false;
  selectedTask: any = {};

  sortBy: string = '';
  filterBy: string = '';
  currentTask = { name: '', assignedTo: '', status: '', deadline: '', projectId: null as number | null };  // Fix the type here
  selectedProjectId: number | null = null;  // Store selected project ID

  minDate: string = '';  // This will store the minimum allowed date

  constructor(private taskService: TaskService, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadProjects();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.filteredTasks = data;
    });
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;  // Store projects
    });
  }

  // Method to get project name by projectId
  getProjectName(projectId: number | null): string {
    if (projectId) {
      const project = this.projects.find(p => p.id === projectId);
      return project ? project.name : 'No project assigned';
    }
    return 'No project assigned';
  }

  openModal(task: any = null): void {
    // Open the modal for adding a task
    this.isModalOpen = true;
  }

  closeModal(): void {
    // Close the modal after adding a task
    this.isModalOpen = false;
    this.currentTask = { name: '', assignedTo: '', status: '', deadline: '', projectId: null as number | null }; // Reset form after closing modal
  }

  saveTask(): void {
    // Add new task with associated projectId
    this.currentTask.projectId = this.selectedProjectId;  // Set the projectId from selectedProjectId
    this.taskService.addTask(this.currentTask).subscribe(() => {
      this.loadTasks();
      this.closeModal();  // Close modal and reset form
    });
  }

  openEditModal(task: any): void {
    // Open the edit modal and pre-fill the selected task details
    this.selectedTask = { ...task };  // Clone task object for editing
    this.selectedProjectId = task.projectId;  // Set selected project ID for editing
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    // Close the edit modal
    this.isEditModalOpen = false;
  }

  editTask(): void {
    // Update task with new projectId if changed
    this.selectedTask.projectId = this.selectedProjectId;
    this.taskService.updateTask(this.selectedTask).subscribe(
      (updatedTask) => {
        const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
        if (index > -1) {
          this.tasks[index] = updatedTask;
        }
        this.closeEditModal();  // Close edit modal after updating
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  filterTasks(): void {
    this.filteredTasks = this.filterBy
      ? this.tasks.filter((task) => task.status === this.filterBy)
      : this.tasks;
  }

  sortByDeadline(): void {
    this.tasks.sort((a, b) => {
      const deadlineA = new Date(a.deadline).getTime();
      const deadlineB = new Date(b.deadline).getTime();
      return deadlineA - deadlineB;
    });
  }
}
