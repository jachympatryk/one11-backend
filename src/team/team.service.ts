import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScraperService } from '../scraper/scraper.service';

@Injectable()
export class TeamService {
  constructor(
    private prisma: PrismaService,
    private scraperService: ScraperService
  ) {}

  async findTeamById(teamId: number) {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
      include: {
        club: true,
      },
    });

    if (!team) {
      throw new Error('Team not found');
    }

    if (team.scrapeUrl) {
      const tableData = await this.scraperService.scrape(team.scrapeUrl);
      return {
        ...team,
        table: tableData,
      };
    }

    return team;
  }

  async findTeamPlayers(teamId: number) {
    return this.prisma.player.findMany({
      where: { teamId: teamId },
    });
  }

  async findTeamLineups(teamId: number) {
    return this.prisma.teamLineup.findMany({
      where: { teamId: teamId },
    });
  }
}
