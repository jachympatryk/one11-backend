import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Attendance, AttendanceStatus } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async getEventWithAttendances(eventId: number) {
    return this.prisma.event.findUnique({
      where: { id: eventId },
      include: {
        attendances: true,
        lineup: {
          include: {
            players: true,
          },
        },
        location: true,
      },
    });
  }

  async getTeamEvents(teamId: number) {
    return this.prisma.event.findMany({
      where: { teamId: teamId },
      include: {
        attendances: true,
        lineup: {
          include: {
            players: true,
          },
        },
        location: true,
      },
    });
  }

  async updateAttendanceStatus(
    eventId: number,
    playerId: number,
    status: AttendanceStatus
  ): Promise<Attendance | null> {
    try {
      return await this.prisma.attendance.update({
        where: {
          eventId_playerId: {
            eventId: eventId,
            playerId: playerId,
          },
        },
        data: {
          status: status,
        },
      });
    } catch (error) {
      console.error('Failed to update attendance status:', error);
      throw new Error('Error updating attendance status');
    }
  }

  async create(eventData: any) {
    const event = await this.prisma.event.create({
      data: {
        name: eventData.name,
        event_type: eventData.event_type,
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
      status: AttendanceStatus.PENDING,
    }));

    await this.prisma.attendance.createMany({
      data: attendances,
    });

    return event;
  }
}
