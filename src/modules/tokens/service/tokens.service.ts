import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { format } from 'date-fns-tz'

import { TokensRepository } from '../repository/tokens.repository';
import { UsersRepository } from '../../users/repository/users.repository';
import { tokenExpirationDay } from '../../../utils/expires-date';

@Injectable()
export class TokensService {
  constructor(private readonly jwtService: JwtService, private readonly tokensRepository: TokensRepository, private readonly usersRepository: UsersRepository) {}

  async createTokens(userId: string) {
    const user = await this.usersRepository.findUserById(userId)

    if (!user) {
      throw new HttpException('User not found!', 404)
    }

    const foundToken = await this.tokensRepository.findById(user.id)

    if (foundToken) {
      await this.tokensRepository.delete(user.id)
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ userId }, { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }),
      this.jwtService.signAsync({ userId }, { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN },),
    ]);


    const { expiresAt } = await this.tokensRepository.create({ accessToken, refreshToken, userId, expiresDate: tokenExpirationDay(process.env.REFRESH_TOKEN_EXPIRES_IN) })

    const formatDate = format(expiresAt, 'dd/MM/yyyy HH:mm:ss', { timeZone: 'America/Recife' })

    return { expiresDate: formatDate, tokens: { accessToken, refreshToken } }
  }

  async createAccessToken(userId: string) {
    const createdAccessToken = await this.jwtService.signAsync({ userId }, { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN })

    return createdAccessToken
  }

  async verifyExpiresRefreshTokenOrCreateNewAccessToken(refreshToken: string) {
    const token = await this.tokensRepository.findByRefreshToken(refreshToken)

    if (!token) {
      throw new HttpException('Token not found!', 404)
    }

    const expiresTokenOrError = await this.jwtService.verifyAsync(token.refreshToken, { secret: process.env.REFRESH_TOKEN_SECRET }).catch((e) => { return e })

    if (expiresTokenOrError.message === 'jwt expired') {
      await this.tokensRepository.delete(token.userId)
      throw new HttpException('Expired token!', 401)
    }

    const newAccessToken = await this.createAccessToken(token.userId)
    await this.tokensRepository.updateAccessToken(token.userId, token.accessToken)

    return { accessToken: newAccessToken }
  }
}