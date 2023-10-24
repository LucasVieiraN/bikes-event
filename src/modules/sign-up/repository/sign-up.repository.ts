import { Injectable } from "@nestjs/common";
import { Users } from "@prisma/client";

import { PrismaService } from "../../../database/prisma.service";
import { CreateAccountDto } from "../dto/create-account.dto";

@Injectable()
export class SignUpRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAccountDto: CreateAccountDto): Promise<Users> {
    return this.prisma.users.create({ data: createAccountDto })
  }
}
