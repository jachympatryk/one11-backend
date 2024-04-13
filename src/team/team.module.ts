import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { PrismaService } from '../prisma/prisma.service';
import { TeamController } from './team.controller';

@Module({
  controllers: [TeamController],
  providers: [TeamService, PrismaService],
})
export class TeamModule {}
