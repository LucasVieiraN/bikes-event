import { Body, Controller, HttpCode, HttpException, Post } from '@nestjs/common';

import { SignUpService } from '../service/sign-up.service';
import { CreateAccountDto } from '../dto/create-account.dto';

@Controller('register')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post()
  @HttpCode(201)
  async signUp(@Body() payload: CreateAccountDto) {
    try {
      await this.signUpService.signUp(payload);
    } catch (e) {
      throw new HttpException(e.message, e.status)
    }
  }
}
