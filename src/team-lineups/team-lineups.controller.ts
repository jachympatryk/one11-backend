import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TeamLineupsService } from './team-lineups.service';

@Controller('teams/:teamId/lineups')
export class TeamLineupsController {
  constructor(private teamLineupsService: TeamLineupsService) {}

  @Post()
  createLineup(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Body() lineupData: any
  ) {
    return this.teamLineupsService.createLineup(teamId, lineupData);
  }

  @Get()
  getLineups(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.teamLineupsService.getLineupsByTeamId(teamId);
  }

  @Get(':lineupId')
  getLineupById(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('lineupId', ParseIntPipe) lineupId: number
  ) {
    return this.teamLineupsService.getLineupById(lineupId);
  }
}
