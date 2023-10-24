import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokensController } from '../controller/tokens.controller';
import { TokensService } from '../service/tokens.service';
import { TokensRepository } from '../repository/tokens.repository';
import { UsersRepository } from '../../../modules/users/repository/users.repository';
import { PrismaService } from '../../../database/prisma.service';

@Module({
  controllers: [TokensController],
  providers: [PrismaService, JwtService, TokensService, TokensRepository, UsersRepository],
})
export class TokensModule {}
