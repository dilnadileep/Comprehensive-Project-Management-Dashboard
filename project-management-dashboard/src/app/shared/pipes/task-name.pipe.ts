import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskName',
})
export class TaskNamePipe implements PipeTransform {
  transform(taskId: number | null, tasks: any[]): string {
    if (taskId) {
      const task = tasks.find((t) => t.id === taskId);
      return task ? task.name : 'No task assigned'; // Assuming tasks have a 'name' property
    }
    return 'No task assigned';
  }
}
