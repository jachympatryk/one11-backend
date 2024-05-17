import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamLineupsService {
  constructor(private prisma: PrismaService) {}

  async getLineupsByTeamId(teamId: number) {
    return this.prisma.teamLineup.findMany({
      where: { teamId },
      include: {
        players: true,
      },
    });
  }

  async createLineup(teamId: number, lineupData: any) {
    return this.prisma.teamLineup.create({
      data: {
        name: lineupData.name,
        formationName: lineupData.formationName,
        teamId: teamId,
        players: {
          create: lineupData.players.map((player: any) => ({
            playerPosition: player.positionId,
            playerId: player.id,
          })),
        },
      },
    });
  }

  async getLineupById(lineupId: number) {
    return this.prisma.teamLineup.findUnique({
      where: { id: lineupId },
      include: {
        players: true,
      },
    });
  }
}
