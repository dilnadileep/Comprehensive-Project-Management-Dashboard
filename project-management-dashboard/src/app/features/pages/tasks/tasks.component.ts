import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';  // Import your project service
import Swal from 'sweetalert2'; // Import SweetAlert2
import { TeamMemberService } from '../../services/team-member.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  projects: any[] = [];  // Hold the list of projects
  teamMembers: any[] = [];
  filteredTasks: any[] = [];
  isModalOpen: boolean = false;
  taskStatuses = ['Pending', 'Completed'];
  isEditModalOpen: boolean = false;
  selectedTask: any = {};
  sortBy: string = '';
  filterBy: string = '';
  currentTask = { name: '', assignedTo: '', status: '', deadline: '', projectId: null as number | null };  // Fix the type here
  selectedProjectId: number | null = null;  // Store selected project ID
  minDate: string = ''; // This will store the minimum allowed date

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private teamMemberService: TeamMemberService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadProjects();
    this.loadTeamMembers();
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

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
  loadTeamMembers(): void {
    this.teamMemberService.getTeamMembers().subscribe((data) => {
      this.teamMembers = data;
    });
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
    this.selectedTask = { ...task }; // Clone task object for editing
    this.isEditModalOpen = true;
  }
  

  closeEditModal(): void {
    // Close the edit modal
    this.isEditModalOpen = false;
  }

  editTask(): void {
    this.taskService.updateTask(this.selectedTask).subscribe(
      (updatedTask) => {
        const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
        if (index > -1) {
          this.tasks[index] = updatedTask;
        }
        this.closeEditModal(); // Close edit modal after updating
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }
  


  deleteTask(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(id).subscribe(() => {
          this.loadTasks();
          Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
        });
      }
    });
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
  assignTeamMemberToTask(taskId: number, memberId: number): void {
    this.taskService.assignTeamMemberToTask(taskId, memberId).subscribe(() => {
      this.loadTasks();
    });
  }
}
