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

  async getUserByAuthId(auth_id: string) {
    return this.prisma.user.findUnique({
      where: { auth_id },
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

  async createOrUpdateUser(
    auth_id: string,
    email: string,
    name?: string,
    surname?: string
  ) {
    const user = await this.prisma.user.upsert({
      where: { auth_id },
      update: {
        email,
        name,
        surname,
      },
      create: {
        auth_id,
        email,
        name: name ? name : 'User',
        surname: surname ? surname : 'Surname',
        created_at: new Date(),
        signup_datetime: new Date(),
      },
    });

    return user;
  }
}
