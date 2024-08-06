import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get(':id')
  getTeamById(@Param('id', ParseIntPipe) teamId: number) {
    return this.teamService.findTeamById(teamId);
  }

  @Get(':id/players')
  getTeamPlayers(@Param('id', ParseIntPipe) teamId: number) {
    return this.teamService.findTeamPlayers(teamId);
  }

  @Get(':id/lineups')
  getTeamLineups(@Param('id', ParseIntPipe) teamId: number) {
    return this.teamService.findTeamLineups(teamId);
  }
}
