import { HttpException, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';

import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaService } from '../../../database/prisma.service';
import { FindUsersOutput } from '../dto/find-users-output';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers(): Promise<FindUsersOutput[]> {
    const users = await this.prisma.users.findMany({ select: { id: true, name: true, cpf: true, email: true } });

    return users
  }

  async findUserById(id: string): Promise<FindUsersOutput> {
    const user = await this.prisma.users.findUnique({ where: { id }, select: { id: true, name: true, cpf: true, email: true } });

    if (!user) {
      throw new HttpException('User not found!', 404)
    }

    return user
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    return this.prisma.users.update({ where: { id }, data: updateUserDto });
  }

  async removeUser(id: string): Promise<void> {
    await this.prisma.users.delete({ where: { id } });
  }
}
