import { Injectable } from '@nestjs/common';

import { compare } from 'bcryptjs';
import { format } from 'date-fns-tz'

import { CreateAccountDto } from './dto/create-account.dto';
import { TokensService } from '../tokens/service/tokens.service'
import { UsersService } from '../users/service/users.service';
import { tokenExpirationDate } from '../../utils/token-expiration-date';
import { createJwt } from '../../utils/create-jwt-tokens';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly tokensService: TokensService) {}

  private async createToken(userId: string): Promise<CreateTokensDtoOutput> {
    const { accessToken, refreshToken } = createJwt(userId)

    const { expiresAt } = await this.tokensService.createTokens({ accessToken, refreshToken, userId, expiresDate: tokenExpirationDate(process.env.REFRESH_TOKEN_EXPIRES_IN) })

    const formatDate = format(expiresAt, 'dd/MM/yyyy HH:mm:ss', { timeZone: 'America/Recife' })

    return { expiresDate: formatDate, tokens: { accessToken, refreshToken } }
  }

  async validateUser(email: string, pass: string): Promise<ValidateUserDtoOutput> {
    const user = await this.usersService.findUserByEmail(email);
    const matchPassword = await compare(pass, user.password)

    if (user && matchPassword) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async signIn(email: string, pass: string): Promise<CreateTokensDtoOutput> {
    const user = await this.validateUser(email, pass)

    if (user.id) {
      await this.tokensService.findTokenAndDelete(user.id)
    }

    return this.createToken(user.id)
  }

  async signUp(createAccountDto: CreateAccountDto): Promise<CreateTokensDtoOutput> {
    const userCreated = await this.usersService.create(createAccountDto)

    return this.createToken(userCreated.id)
  }
}