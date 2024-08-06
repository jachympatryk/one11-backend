// message.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async create(
    conversationId: number,
    content: string,
    functionaryId: number | null,
    playerId: number | null
  ) {
    const data = {
      content,
      conversationId,
      functionaryId,
      playerId,
    };

    return this.prisma.message.create({
      data,
    });
  }

  async getMessagesByConversation(conversationId: string) {
    const numericConversationId = parseInt(conversationId);
    if (isNaN(numericConversationId)) {
      throw new Error('Invalid conversationId provided');
    }

    return this.prisma.message.findMany({
      where: { conversationId: numericConversationId },
      include: {
        player: true,
        functionary: true,
      },
    });
  }
}
