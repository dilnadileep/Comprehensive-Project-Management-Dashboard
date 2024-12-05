import { TeamMemberNamePipe } from './team-member-name.pipe';

describe('TeamMemberNamePipe', () => {
  it('create an instance', () => {
    const pipe = new TeamMemberNamePipe();
    expect(pipe).toBeTruthy();
  });
});
