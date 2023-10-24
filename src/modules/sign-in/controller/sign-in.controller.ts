import { Body, Controller, HttpCode, HttpException, Post } from '@nestjs/common';

import { SignInService } from '../service/sign-in.service';
import { LoginDto } from '../dto/login.dto';

@Controller('signin')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post()
  @HttpCode(200)
  async signIn(@Body() payload: LoginDto) {
    try {
      return this.signInService.signIn(payload)
    } catch (e) {
      throw new HttpException(e.message, e.status)
    }
  }
}
