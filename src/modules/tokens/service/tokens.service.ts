import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokensRepository } from '../repository/tokens.repository';
import { CreateAuthTokensDtoInput, CreateAuthTokensDtoOutput } from '../dto/create-auth-tokens.dto';

@Injectable()
export class TokensService {
  constructor(private readonly jwtService: JwtService, private readonly tokensRepository: TokensRepository) {}

  async createTokens({ accessToken, refreshToken, expiresDate, userId }: CreateAuthTokensDtoInput): Promise<CreateAuthTokensDtoOutput> {
    return this.tokensRepository.create({ accessToken, refreshToken, expiresDate, userId })
  }

  async findTokenAndDelete(userId: string): Promise<void | null> {
    const foundToken = await this.tokensRepository.findById(userId)

    if (foundToken) {
      return this.tokensRepository.delete(foundToken.userId)
    }

    return null
  }

  async createAccessToken(userId: string): Promise<string> {
    const createdAccessToken = await this.jwtService.signAsync({ userId },
      {
        secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      })

    return createdAccessToken
  }

  async verifyExpiresRefreshTokenOrCreateNewAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    const token = await this.tokensRepository.findByRefreshToken(refreshToken)

    if (!token) {
      throw new HttpException('Token not found!', 404)
    }

    const expiresTokenOrError = await this.jwtService.verifyAsync(token.refreshToken, { secret: process.env.REFRESH_TOKEN_SECRET })
      .catch((e) => { return e })

    if (expiresTokenOrError.message === 'jwt expired') {
      await this.tokensRepository.delete(token.userId)
      throw new HttpException('Expired token!', 401)
    }

    const newAccessToken = await this.createAccessToken(token.userId)
    await this.tokensRepository.updateAccessToken(token.userId, newAccessToken)

    return { accessToken: newAccessToken }
  }
}