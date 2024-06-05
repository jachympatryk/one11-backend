import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        players: true,
        functionaries: true,
      },
    });
  }

  async getUserByAuthId(auth_id: number) {
    return this.prisma.user.findUnique({
      where: { id: auth_id },
    });
  }

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
