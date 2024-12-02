import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly endpoint = '/projects'; // Relative endpoint for projects

  constructor(private http: HttpClient) {} 

  getProjects(): Observable<any[]> {
    // Fetches the list of projects from the API
    return this.http.get<any[]>(this.endpoint);
  }

  addProject(project: any): Observable<any> {
    // Sends a request to add a new project to the API
    return this.http.post<any>(this.endpoint, project);
  }

  deleteProject(id: number): Observable<void> {
    // Sends a request to delete a project by its ID
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
