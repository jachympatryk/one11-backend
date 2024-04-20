import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlayersController } from './player.controller';
import { PlayersService } from './player.service';

@Module({
  controllers: [PlayersController],
  providers: [PlayersService, PrismaService],
})
export class PlayerModule {}
