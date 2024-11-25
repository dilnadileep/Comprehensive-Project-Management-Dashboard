import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/projects'; 

  constructor(private http: HttpClient) {} // Injects the HttpClient service for HTTP requests

  getProjects(): Observable<any[]> {
    // Fetches the list of projects from the API
    return this.http.get<any[]>(this.apiUrl);
  }

  addProject(project: any): Observable<any> {
    // Sends a request to add a new project to the API
    return this.http.post<any>(this.apiUrl, project);
  }

  deleteProject(id: number): Observable<void> {
    // Sends a request to delete a project by its ID
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
