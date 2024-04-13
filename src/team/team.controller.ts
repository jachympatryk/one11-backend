import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get(':id')
  getTeamById(@Param('id', ParseIntPipe) teamId: number) {
    const includeOptions = {
      players: true,
      events: true,
      functionaries: true,
    };
    return this.teamService.findTeamById(teamId, includeOptions);
  }

  @Get(':id/events')
  getTeamEvents(@Param('id', ParseIntPipe) teamId: number) {
    return this.teamService.findTeamEventsById(teamId);
  }
}
