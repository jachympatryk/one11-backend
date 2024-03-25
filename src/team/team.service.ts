import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async findTeamById(teamId: number) {
    return this.prisma.team.findUnique({
      where: { id: teamId },
      include: {
        players: true, // Opcjonalnie: załącz informacje o graczach
        functionaries: true, // Opcjonalnie: załącz informacje o funkcjonariuszach
        events: true, // Opcjonalnie: załącz informacje o wydarzeniach
      },
    });
  }
}
