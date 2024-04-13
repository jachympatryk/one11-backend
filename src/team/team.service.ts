import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScraperService } from '../scraper/scraper.service';

@Injectable()
export class TeamService {
  constructor(
    private prisma: PrismaService,
    private scraperService: ScraperService
  ) {}

  async findTeamById(
    teamId: number,
    includeOptions: {
      players: boolean;
      events: boolean;
      functionaries: boolean;
    }
  ) {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
      include: {
        players: includeOptions.players,
        functionaries: includeOptions.functionaries,
        events: includeOptions.events,
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

  async findTeamEventsById(teamId: number) {
    return this.prisma.team.findUnique({
      where: { id: teamId },
      include: { events: true },
    });
  }
}
