import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  taskStatuses = ['Pending', 'Completed'];
  sortBy: string = '';
  filterBy: string = '';
  currentTask = { name: '', assignedTo: '', status: '', deadline: '' };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.filteredTasks = data;
    });
  }

  openModal(task: any = null): void {
    this.isEditing = !!task;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveTask(): void {
      // Add new task
      this.taskService.addTask(this.currentTask).subscribe(() => {
        this.loadTasks();
        this.closeModal();
        // Reset the form fields after adding a project
      this.currentTask = { name: '', assignedTo: '',status:'', deadline: '' };
      });
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