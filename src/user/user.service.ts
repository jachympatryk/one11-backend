import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Pobierz wszystkich graczy dla danego użytkownika
  async findUserPlayers(userId: number) {
    return this.prisma.userPlayers.findMany({
      where: {
        userId: userId,
      },
      include: {
        player: true,
      },
    });
  }

  async findUserFunctionaries(userId: number) {
    return this.prisma.userFunctionaries.findMany({
      where: {
        userId: userId,
      },
      include: {
        functionary: true,
      },
    });
  }
}

