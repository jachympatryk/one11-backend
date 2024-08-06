import { Body, Controller, Post } from '@nestjs/common';
import { PlayersService } from './player.service';

@Controller('players')
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Post()
  create(@Body() playerData: any) {
    return this.playersService.create(playerData);
  }
}
