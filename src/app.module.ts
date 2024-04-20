import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { TeamModule } from './team/team.module';
import { ScraperService } from './scraper/scraper.service';
import { EventsModule } from './event/event.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [UserModule, PrismaModule, TeamModule, EventsModule, PlayerModule],
  controllers: [AppController],
  providers: [AppService, ScraperService],
})
export class AppModule {}
