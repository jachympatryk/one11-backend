import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { PrismaService } from '../prisma/prisma.service';
import { TeamController } from './team.controller';
import { ScraperService } from '../scraper/scraper.service';

@Module({
  controllers: [TeamController],
  providers: [TeamService, PrismaService, ScraperService],
})
export class TeamModule {}
