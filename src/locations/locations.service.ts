import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async getLocationsByClubId(clubId: number) {
    return this.prisma.location.findMany({
      where: { clubId },
    });
  }
}
