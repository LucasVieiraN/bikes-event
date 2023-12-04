import { Body, Controller, Post } from '@nestjs/common';
import { Users } from '@prisma/client';

import { AuthService } from '../service/auth.service';
import { TokensService } from '../../tokens/service/tokens.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly tokensService: TokensService) {}

  @Post('signin')
  async login(@Body() payload: any) {
    return this.authService.signIn(payload.email, payload.password)
  }

  @Post('register')
  async register(@Body() user: Users) {
    return this.authService.signUp(user)
  }
}
