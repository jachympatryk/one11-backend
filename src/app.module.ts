import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { TeamModule } from './team/team.module';
import { ScraperService } from './scraper/scraper.service';

@Module({
  imports: [UserModule, PrismaModule, TeamModule],
  controllers: [AppController],
  providers: [AppService, ScraperService],
})

export class AppModule {}
