import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(eventData: any) {
    return this.prisma.event.create({
      data: eventData,
    });
  }
}
