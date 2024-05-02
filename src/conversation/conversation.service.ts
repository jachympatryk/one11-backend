import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Conversation } from '@prisma/client'; // Importing the Conversation type if it's exported from your Prisma client

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async getConversationsByTeam(teamId: string): Promise<Conversation[]> {
    const numericTeamId = parseInt(teamId);
    if (isNaN(numericTeamId)) {
      throw new Error('Invalid teamId provided');
    }
    return this.prisma.conversation.findMany({
      where: {
        teamId: numericTeamId,
      },
    });
  }
}
