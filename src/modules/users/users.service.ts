import { Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../database/prisma.service';
import { ErrorException } from '../../errors/exceptions';
import { isValidPassword } from '../../utils/is-valid-password';
import { hashPassword } from '../../utils/hash-password'
import { validateAndFormatCPF } from '../../utils/validate-and-format-cpf';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser({ cpf, email, name, password }: CreateUserDto): Promise<void> {
    const findUserByCPF = await this.prisma.users.findUnique({ where: { cpf } })
    const findUserByEmail = await this.prisma.users.findUnique({ where: { email } })

    if (findUserByCPF) {
      throw new ErrorException('Cpf is a single field.', 400, 'BAD REQUEST')
    }

    if (findUserByEmail) {
      throw new ErrorException('Email is a single field.', 400, 'BAD REQUEST')
    }

    isValidPassword(password)
    const hashedPassword = await hashPassword(password)
    const cpfValidatedAndFormated = validateAndFormatCPF(cpf)

    await this.prisma.users.create({ data: { cpf: cpfValidatedAndFormated, email, name, password: hashedPassword } })
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.users.findMany();
  }

  async findOneUser(id: string): Promise<User> {
    return this.prisma.users.findUnique({ where: { id } });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.users.update({ where: { id }, data: updateUserDto });
  }

  async removeUser(id: string): Promise<void> {
    await this.prisma.users.delete({ where: { id } });
  }
}
