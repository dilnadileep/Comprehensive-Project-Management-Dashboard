import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTeamMembers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/teamMembers`);
  }

  addMember(member: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/teamMembers`, member);
  }

  updateMember(member: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/teamMembers/${member.id}`, member);
  }

  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/teamMembers/${id}`);
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projects`);
  }
}
