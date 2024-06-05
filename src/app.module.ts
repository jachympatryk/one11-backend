import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { TeamModule } from './team/team.module';
import { ScraperService } from './scraper/scraper.service';
import { EventsModule } from './event/event.module';
import { PlayerModule } from './player/player.module';
import { ApiKeyMiddleware } from './api-key.middleware'; // Zaimportuj middleware do sprawdzania klucza API
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { TeamLineupsModule } from './team-lineups/team-lineups.module';
import { TeamLineupsController } from './team-lineups/team-lineups.controller';
import { TeamLineupsService } from './team-lineups/team-lineups.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    TeamModule,
    EventsModule,
    PlayerModule,
    ConversationModule,
    MessageModule,
    TeamLineupsModule,
    AuthModule,
  ],
  controllers: [AppController, TeamLineupsController],
  providers: [AppService, ScraperService, TeamLineupsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
