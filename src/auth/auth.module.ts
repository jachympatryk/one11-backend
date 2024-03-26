// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from '../user/user.service'; // Ścieżka do PrismaModule

@Module({
  imports: [PrismaModule], // Importuj PrismaModule
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
