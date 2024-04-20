import { Body, Controller, Post } from '@nestjs/common';
import { EventsService } from './event.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  create(@Body() eventData: any) {
    return this.eventsService.create(eventData);
  }
}
