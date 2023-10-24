import { Module } from '@nestjs/common';

import { SignUpService } from '../service/sign-up.service';
import { SignUpController } from '../controller/sign-up.controller';
import { SignUpRepository } from '../repository/sign-up.repository';
import { UsersRepository } from '../../../modules/users/repository/users.repository';
import { PrismaService } from '../../../database/prisma.service';

@Module({
  controllers: [SignUpController],
  providers: [PrismaService, SignUpRepository, UsersRepository, SignUpService]
})
export class SignUpModule {}
