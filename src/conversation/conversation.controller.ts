import { Controller, Get, Param } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get(':teamId')
  findAllByTeam(@Param('teamId') teamId: string) {
    return this.conversationService.getConversationsByTeam(teamId);
  }
}
