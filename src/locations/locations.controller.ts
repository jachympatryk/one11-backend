import { Controller, Get, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  async getLocationsByClubId(@Query('clubId') clubId: string) {
    console.log('clubId', clubId);

    const clubIdNumber = parseInt(clubId, 10);
    if (isNaN(clubIdNumber)) {
      throw new Error('Invalid clubId');
    }
    return this.locationsService.getLocationsByClubId(clubIdNumber);
  }
}
