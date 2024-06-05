// src/auth/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body()
    userData: {
      email: string;
      password: string;
      auth_id: string;
      name?: string;
      surname?: string;
    }
  ) {
    return this.authService.registerUser(
      userData.email,
      userData.password,
      userData.auth_id,
      userData.name,
      userData.surname
    );
  }

  @Post('login')
  async loginUser(@Body() loginData: { email: string; password: string }) {
    return this.authService.login(loginData.email, loginData.password);
  }
}
