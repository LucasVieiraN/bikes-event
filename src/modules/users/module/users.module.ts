import { Module } from '@nestjs/common';

import { UsersService } from '../service/users.service';
import { UsersController } from '../controller/users.controller';
import { UsersRepository } from '../repository/users.repository';
import { PrismaService } from '../../../database/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService, UsersRepository],
})
export class UsersModule {}
