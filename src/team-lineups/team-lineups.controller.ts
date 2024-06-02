import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TeamLineupsService } from './team-lineups.service';

@Controller('lineups')
export class TeamLineupsController {
  constructor(private teamLineupsService: TeamLineupsService) {}

  @Post(':teamId')
  createLineup(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Body() lineupData: any
  ) {
    return this.teamLineupsService.createLineup(teamId, lineupData);
  }

  @Get(':lineupId')
  getLineupById(@Param('lineupId', ParseIntPipe) lineupId: number) {
    return this.teamLineupsService.getLineupById(lineupId);
  }
}
