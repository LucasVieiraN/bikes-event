import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

import { LocalStrategy } from '../strategy/local-strategy';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../controller/auth.controller';
import { UsersRepository } from '../../users/repository/users.repository';
import { PrismaService } from '../../../database/prisma.service';
import { TokensService } from '../../tokens/service/tokens.service';
import { TokensRepository } from '../../tokens/repository/tokens.repository';
import { UsersService } from '../../users/service/users.service';

@Module({
  controllers: [AuthController],
  imports: [PassportModule],
  providers: [LocalStrategy, TokensRepository, UsersRepository, PrismaService, TokensService, UsersService, AuthService, JwtService],
})
export class AuthModule {}