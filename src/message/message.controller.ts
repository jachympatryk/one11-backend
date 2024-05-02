import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(
    @Body('conversationId') conversationId: number,
    @Body('content') content: string,
    @Body('functionaryId') functionaryId: number | null,
    @Body('playerId') playerId: number | null
  ) {
    return this.messageService.create(
      conversationId,
      content,
      functionaryId,
      playerId
    );
  }

  @Get(':conversationId')
  findAllByConversation(@Param('conversationId') conversationId: string) {
    return this.messageService.getMessagesByConversation(conversationId);
  }
}
