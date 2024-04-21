import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { EventsService } from './event.service';
import { AttendanceStatus } from '@prisma/client';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  create(@Body() eventData: any) {
    return this.eventsService.create(eventData);
  }

  @Patch(':eventId/attendances/:playerId')
  updateAttendanceStatus(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('playerId', ParseIntPipe) playerId: number,
    @Body('status') status: string
  ) {
    return this.eventsService.updateAttendanceStatus(
      eventId,
      playerId,
      status as AttendanceStatus
    );
  }

  @Get(':id')
  getEvent(@Param('id', ParseIntPipe) eventId: number) {
    return this.eventsService.getEventWithAttendances(eventId);
  }
}
