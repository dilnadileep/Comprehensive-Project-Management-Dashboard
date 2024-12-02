import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectName',
})
export class ProjectNamePipe implements PipeTransform {
  transform(projectId: number | null, projects: any[]): string {
    if (projectId) {
      const project = projects.find((p) => p.id === projectId);
      return project ? project.name : 'No project assigned';
    }
    return 'No project assigned';
  }
}
