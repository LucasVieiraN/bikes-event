import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/module/users.module';
import { TokensModule } from './modules/tokens/module/tokens.module';
import { SignUpModule } from './modules/sign-up/module/sign-up.module';
import { SignInModule } from './modules/sign-in/module/sign-in.module';

@Module({
  imports: [UsersModule, TokensModule, SignUpModule, SignInModule],
})
export class AppModule {}
