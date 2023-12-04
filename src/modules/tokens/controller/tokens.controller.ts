import { Controller, Post, HttpException, Headers, HttpCode } from '@nestjs/common';

import { TokensService } from '../service/tokens.service';

@Controller('sessions')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post('refreshToken')
  @HttpCode(201)
  async verifyExpiresRefreshTokenOrCreateNewAccessTokenHandler(@Headers('authorization') refreshToken: string) {
    try {
      const tokenSplited = refreshToken.split('Bearer ')[1]

      return this.tokensService.verifyExpiresRefreshTokenOrCreateNewAccessToken(tokenSplited)
    } catch (e) {
      throw new HttpException(e.message, e.status)
    }
  }
}