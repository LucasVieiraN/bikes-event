import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/module/users.module';
import { TokensModule } from './modules/tokens/module/tokens.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, TokensModule, AuthModule],
})
export class AppModule {}
