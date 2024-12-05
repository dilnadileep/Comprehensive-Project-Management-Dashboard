import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly endpoint = '/tasks'; // Relative endpoint

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint);
  }

  addTask(task: any): Observable<any> {
    return this.http.post(this.endpoint, task);
  }

  updateTask(task: any): Observable<any> {
    return this.http.put(`${this.endpoint}/${task.id}`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${taskId}`);
  }
  assignTeamMemberToTask(taskId: number, teamMemberId: number): Observable<any> {
    return this.http.patch<any>(`${this.endpoint}/${taskId}`, { assignedTo: teamMemberId });
  }
  
}
