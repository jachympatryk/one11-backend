import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.findUserById(userId);
  }

  @Get('/:id/players')
  findUserPlayers(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.findUserPlayers(userId);
  }

  @Get('/:id/functionaries')
  findUserFunctionaries(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.findUserFunctionaries(userId);
  }

  @Get('/by-auth-id/:auth_id')
  getUserByAuthId(@Param('auth_id') auth_id: number) {
    return this.userService.getUserByAuthId(auth_id);
  }
}
