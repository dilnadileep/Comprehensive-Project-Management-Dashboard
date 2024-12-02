import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamMemberService {
  private readonly endpoint = '/teamMembers'; // Relative endpoint

  constructor(private http: HttpClient) {}

  getTeamMembers(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint);
  }

  addTeamMember(member: any): Observable<any> {
    return this.http.post(this.endpoint, member);
  }

  updateTeamMember(member: any): Observable<any> {
    return this.http.put(`${this.endpoint}/${member.id}`, member);
  }

  deleteTeamMember(memberId: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${memberId}`);
  }
  assignToProject(memberId: number, projectId: number): Observable<any> {
    return this.http.patch<any>(`${this.endpoint}/${memberId}`, { projectId });
  }

  assignToTask(memberId: number, taskId: number): Observable<any> {
    return this.http.patch<any>(`${this.endpoint}/${memberId}`, { taskId });
  }
}
