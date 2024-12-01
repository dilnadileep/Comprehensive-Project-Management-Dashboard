import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from '../../services/team-member.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {
  teamMembers: any[] = [];
  projects: any[] = [];
  isAddModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  newMember = { name: '', role: '', assignedTo: '' };
  selectedMember: any = null;

  constructor(private teamMemberService: TeamMemberService) {}

  ngOnInit(): void {
    this.loadTeamMembers();
    this.loadProjects();
  }

  // Fetch team members
  loadTeamMembers(): void {
    this.teamMemberService.getTeamMembers().subscribe((data) => {
      this.teamMembers = data;
    });
  }

  // Fetch projects for assignment dropdown
  loadProjects(): void {
    this.teamMemberService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }

  // Open Add Modal
  openAddModal(): void {
    this.newMember = { name: '', role: '', assignedTo: '' };
    this.isAddModalOpen = true;
  }

  // Close Add Modal
  closeAddModal(): void {
    this.isAddModalOpen = false;
  }

  // Save New Member
  saveNewMember(): void {
    this.teamMemberService.addMember(this.newMember).subscribe(() => {
      this.loadTeamMembers();
      this.closeAddModal();
    });
  }

  // Open Edit Modal
  openEditModal(member: any): void {
    this.selectedMember = { ...member }; // Clone the member object to avoid direct mutation
    this.isEditModalOpen = true;
  }

  // Close Edit Modal
  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  // Save Edited Member
  saveEditedMember(): void {
    this.teamMemberService.updateMember(this.selectedMember).subscribe(() => {
      this.loadTeamMembers();
      this.closeEditModal();
    });
  }

  // Delete a Member
  deleteMember(id: number): void {
    if (confirm('Are you sure you want to delete this member?')) {
      this.teamMemberService.deleteMember(id).subscribe(() => {
        this.loadTeamMembers();
      });
    }
  }
}
