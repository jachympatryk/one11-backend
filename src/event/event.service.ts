import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AttendanceStatus } from '@prisma/client'; // Uwzględnij import dla AttendanceStatus

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async getEventWithAttendances(eventId: number) {
    return this.prisma.event.findUnique({
      where: { id: eventId },
      include: {
        attendances: true,
      },
    });
  }

  async create(eventData: any) {
    const event = await this.prisma.event.create({
      data: {
        name: eventData.name,
        event_type: eventData.event_type,
        created_by: eventData.created_by,
        start_time: new Date(eventData.start_time),
        end_time: eventData.end_time ? new Date(eventData.end_time) : null,
        teamId: eventData.teamId,
      },
    });

    const players = await this.prisma.player.findMany({
      where: { teamId: eventData.teamId, active: true },
    });

    const attendances = players.map((player) => ({
      eventId: event.id,
      playerId: player.id,
      status: AttendanceStatus.PENDING, // Używaj enuma zamiast stringa
    }));

    await this.prisma.attendance.createMany({
      data: attendances,
    });

    return event;
  }
}
