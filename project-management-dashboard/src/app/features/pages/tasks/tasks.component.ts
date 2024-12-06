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
  filterBy: string = '';
  currentTask = { name: '', assignedTo: '', status: '', deadline: '', projectId: null as number | null };  
  selectedProjectId: number | null = null;  
  minDate: string = ''; 


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
  isPastDate(): boolean {
    if (!this.currentTask.deadline) return false;
  
    const enteredDate = new Date(this.currentTask.deadline).setHours(0, 0, 0, 0); // Remove time part
    const todayDate = new Date(this.minDate).setHours(0, 0, 0, 0); // Today at midnight
    return enteredDate < todayDate;
  }
  isEditPastDate(): boolean {
    if (!this.selectedTask.deadline) return false;
  
    const enteredDate = new Date(this.selectedTask.deadline).setHours(0, 0, 0, 0); // Remove time part
    const todayDate = new Date(this.minDate).setHours(0, 0, 0, 0); // Today at midnight
    return enteredDate < todayDate;
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


  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.currentTask = { name: '', assignedTo: '', status: '', deadline: '', projectId: null as number | null }; // Reset form after closing modal
  }

    // Add new task with associated projectId
  saveTask(): void {
    this.currentTask.projectId = this.selectedProjectId;  
    this.taskService.addTask(this.currentTask).subscribe(() => {
      this.loadTasks();
      this.closeModal();  
    });
  }

  openEditModal(task: any): void {
    this.selectedTask = { ...task }; // Clone task object for editing
    this.isEditModalOpen = true;
  }
  

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  editTask(): void {
    this.taskService.updateTask(this.selectedTask).subscribe(
      (updatedTask) => {
        const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
        if (index > -1) {
          this.tasks[index] = updatedTask;
        }
        this.closeEditModal(); 
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

}
