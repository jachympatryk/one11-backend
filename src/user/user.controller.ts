import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id/players')
  findUserPlayers(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.findUserPlayers(userId);
  }

  @Get('/:id/functionaries')

  findUserFunctionaries(@Param('id', ParseIntPipe) userId: number) {
    console.log('FUNC')
    return this.userService.findUserFunctionaries(userId);
  }
}

