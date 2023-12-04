import { HttpException, Injectable } from "@nestjs/common"
import { Users } from "@prisma/client"

import { PrismaService } from "../../../database/prisma.service"
import { CreateAccountDto } from "../../../modules/auth/dto/create-account.dto"
import { UpdateUserDto } from "../dto/update-user.dto"
import { FindUsersOutput } from "../dto/find-users-output"

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAccountDto: CreateAccountDto): Promise<Users> {
    return this.prisma.users.create({ data: createAccountDto })
  }

  async findUserById(userId: string): Promise<FindUsersOutput> {
    return this.prisma.users.findFirst({ where: { id: userId }, select: { id: true, name: true, cpf: true, email: true } })
  }

  async findAllUsers(): Promise<FindUsersOutput[]> {
    return this.prisma.users.findMany({ select: { id: true, name: true, cpf: true, email: true } });
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.prisma.users.findUnique({ where: { email } })
  }

  async findByCPF(cpf: string): Promise<Users | null> {
    return this.prisma.users.findUnique({ where: { cpf } })
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    return this.prisma.users.update({ where: { id }, data: updateUserDto })
  }

  async deleteUser(id: string): Promise<void> {
    await this.prisma.users.delete({ where: { id } });
  }
}
