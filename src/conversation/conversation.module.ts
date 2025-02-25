import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ConversationService, PrismaService],
  controllers: [ConversationController],
})
export class ConversationModule {}
