import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from '../../services/team-member.service';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import Swal from 'sweetalert2'; // Import SweetAlert2

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
  newTeamMember: any = { name: '', role: '' };
  
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
    this.newTeamMember = { name: '', role: '' }; // Reset form
  }

  saveTeamMember(): void {
    this.teamMemberService.addTeamMember(this.newTeamMember).subscribe(() => {
      this.loadTeamMembers();
      this.closeAddModal(); 
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
//assigning team member with project and task 
  assignMember(): void {
    if (this.selectedAssignId !== null) {
      if (this.assignTo === 'project') {
        this.selectedMember.projectId = this.selectedAssignId; // Update the team member with the project ID
      } else if (this.assignTo === 'task') {
        this.selectedMember.taskId = this.selectedAssignId;
        
      }
      // Save the updated team member to the server
      this.teamMemberService.updateTeamMember(this.selectedMember).subscribe(() => {
        this.loadTeamMembers(); 
        this.closeModal();
      });
    }
  }

  deleteTeam(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this team member?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.teamMemberService.deleteTeamMember(id).subscribe(() => {
          this.loadTeamMembers();
          Swal.fire('Deleted!', 'This team member has been deleted.', 'success');
        });
      }
    });
  }
  
}
