import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamMemberName',
})
export class TeamMemberNamePipe implements PipeTransform {
  transform(memberId: number, teamMembers: any[]): string {
    const member = teamMembers.find((m) => m.id === memberId);
    return member ? member.name : 'Unassigned';
  }
}
