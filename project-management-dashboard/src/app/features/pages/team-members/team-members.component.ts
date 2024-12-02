import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from '../../services/team-member.service';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss'],
})
export class TeamMembersComponent implements OnInit {
  teamMembers: any[] = [];
  projects: any[] = [];
  tasks: any[] = [];
  isAddModalOpen: boolean = false;
  isModalOpen: boolean = false;
  assignTo: 'project' | 'task' = 'project';  // To determine if the modal is for assigning to a project or task
  selectedAssignId: any;
  selectedMember: any;
  newTeamMember: any = { name: '', role: '', projectId: null };
  
  constructor(
    private teamMemberService: TeamMemberService,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loadTeamMembers();
    this.loadProjects();
    this.loadTasks();
  }

  loadTeamMembers(): void {
    this.teamMemberService.getTeamMembers().subscribe((data) => {
      this.teamMembers = data;
    });
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  openAddModal(): void {
    this.isAddModalOpen = true;
  }

  closeAddModal(): void {
    this.isAddModalOpen = false;
    this.newTeamMember = { name: '', role: '', projectId: null }; // Reset form
  }

  saveTeamMember(): void {
    this.teamMemberService.addTeamMember(this.newTeamMember).subscribe(() => {
      this.loadTeamMembers();
      this.closeAddModal();  // Close modal after saving
    });
  }

  openModal(member: any, type: 'project' | 'task'): void {
    this.selectedMember = member;
    this.assignTo = type;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedAssignId = null; // Reset selection
  }

  assignMember(): void {
    if (this.selectedAssignId !== null) {
      if (this.assignTo === 'project') {
        this.selectedMember.projectId = this.selectedAssignId;
      } else if (this.assignTo === 'task') {
        this.selectedMember.taskId = this.selectedAssignId;
      }
  
      // Save the updated team member to the server
      this.teamMemberService.updateTeamMember(this.selectedMember).subscribe(() => {
        this.loadTeamMembers(); // Refresh the team members list
        this.closeModal();
      });
    }
  }
  
  getProjectName(projectId: number): string {
    const project = this.projects.find(p => p.id === projectId);
    return project ? project.name : 'No project assigned';
  }
  getTaskName(taskId: number): string {
    const task = this.tasks.find(t => t.id === taskId);
    return task ? task.name : 'No task assigned'; // Assuming tasks have a 'title' property
  }
  
}
