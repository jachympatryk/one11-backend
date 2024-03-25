import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get(':id')
  getTeamById(@Param('id', ParseIntPipe) teamId: number) {
    return this.teamService.findTeamById(teamId);
  }
}
