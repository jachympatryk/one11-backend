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

  // TODO: get user with players and functionaries
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

  @Post('sync')
  async syncAuthUser(
    @Body()
    body: {
      auth_id: string;
      email: string;
      name?: string;
      surname?: string;
    }
  ) {
    return this.userService.createOrUpdateUser(
      body.auth_id,
      body.email,
      body.name,
      body.surname
    );
  }

  @Get('/by-auth-id/:auth_id')
  getUserByAuthId(@Param('auth_id') auth_id: string) {
    console.log('auth_id');

    return this.userService.getUserByAuthId(auth_id);
  }
}
