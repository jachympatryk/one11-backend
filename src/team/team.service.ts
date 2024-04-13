import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async findTeamById(
    teamId: number,
    includeOptions: {
      players: boolean;
      events: boolean;
      functionaries: boolean;
    }
  ) {
    return this.prisma.team.findUnique({
      where: { id: teamId },
      include: {
        players: includeOptions.players,
        functionaries: includeOptions.functionaries,
        events: includeOptions.events,
      },
    });
  }

  async findTeamEventsById(teamId: number) {
    return this.prisma.team.findUnique({
      where: { id: teamId },
      include: { events: true },
    });
  }
}
