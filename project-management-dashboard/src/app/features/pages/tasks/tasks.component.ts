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
  isEditModalOpen: boolean = false; 
  taskStatuses = ['Pending', 'Completed'];
  sortBy: string = '';
  filterBy: string = '';
  currentTask = { name: '', assignedTo: '', status: '', deadline: '' }; 
  selectedTask: any = {}; 
  minDate: string = ''; 

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Initialize component and load tasks
    this.loadTasks();
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Set the minimum date to today's date
  }

// Fetches the list of tasks from the service and stores it in `tasks` and `filteredTasks`.
  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.filteredTasks = data;
    });
  }

 // Opens the Add Task modal. If `task` is provided, pre-fills the form for editing.
  openModal(task: any = null): void {
    this.isModalOpen = true;
  }

 // Closes the Add Task modal and resets the form.
  closeModal(): void {
    this.isModalOpen = false;
  }

// Saves a new task using the task service and reloads the task list.
  saveTask(): void {
    this.taskService.addTask(this.currentTask).subscribe(() => {
      this.loadTasks();
      console.log('Task saved:', this.currentTask);
      this.closeModal();
      // Reset the form fields after adding a task
      this.currentTask = { name: '', assignedTo: '', status: '', deadline: '' };
    });
  }

  // Opens the Edit Task modal and pre-fills the form with the selected task.
  openEditModal(task: any): void {
    this.selectedTask = { ...task }; // Clone the task object to avoid direct mutation
    this.isEditModalOpen = true;
  }

// Closes the Edit Task modal.
  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

// Updates the selected task using the task service and reflects the changes in the UI.
  editTask(): void {
    this.taskService.updateTask(this.selectedTask).subscribe(
      (updatedTask) => {
        // Update the task list in the UI
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

// Deletes a task by its ID after user confirmation and reloads the task list.
  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.loadTasks();
      });
    }
  }

// Filters tasks based on the selected status.
  filterTasks(): void {
    this.filteredTasks = this.filterBy
      ? this.tasks.filter((task) => task.status === this.filterBy)
      : this.tasks;
  }

// Sorts tasks by their deadline in ascending order.
  sortByDeadline(): void {
    this.tasks.sort((a, b) => {
      const deadlineA = new Date(a.deadline).getTime();
      const deadlineB = new Date(b.deadline).getTime();
      return deadlineA - deadlineB;
    });
  }
}
