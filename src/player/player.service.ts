// src/players/players.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) {}

  async create(playerData: any) {
    return this.prisma.player.create({
      data: playerData,
    });
  }
}
