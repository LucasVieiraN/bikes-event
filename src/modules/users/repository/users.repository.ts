import { Injectable } from "@nestjs/common"
import { Users } from "@prisma/client"

import { PrismaService } from "../../../database/prisma.service"

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(userId: string): Promise<Users> {
    return this.prisma.users.findFirst({ where: { id: userId } })
  }

  async findByEmail(email: string): Promise<Users> {
    return this.prisma.users.findUnique({ where: { email } })
  }

  async findByCPF(cpf: string): Promise<Users> {
    return this.prisma.users.findUnique({ where: { cpf } })
  }
}
