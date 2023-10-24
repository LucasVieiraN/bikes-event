import { Module } from '@nestjs/common';

import { SignInService } from '../service/sign-in.service';
import { SignInController } from '../controller/sign-in.controller';
import { UsersRepository } from '../../../modules/users/repository/users.repository';
import { PrismaService } from '../../../database/prisma.service';

@Module({
  controllers: [SignInController],
  providers: [PrismaService, SignInService, UsersRepository],
})
export class SignInModule {}
