import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { EventsService } from './event.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  create(@Body() eventData: any) {
    return this.eventsService.create(eventData);
  }

  @Get(':id')
  getEvent(@Param('id', ParseIntPipe) eventId: number) {
    return this.eventsService.getEventWithAttendances(eventId);
  }
}
