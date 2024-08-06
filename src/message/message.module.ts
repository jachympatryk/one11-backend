import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PrismaService } from '../prisma/prisma.service'; // Upewnij się, że jest importowany

@Module({
  providers: [MessageService, PrismaService], // Dodaj PrismaService
  controllers: [MessageController],
})
export class MessageModule {}
