import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/module/users.module';
import { TokensModule } from './modules/tokens/module/tokens.module';
import { AuthModule } from './modules/auth/module/auth.module';
import { EventsModule } from './modules/events/module/events.module';

@Module({
  imports: [UsersModule, TokensModule, AuthModule, EventsModule],
})
export class AppModule {}
