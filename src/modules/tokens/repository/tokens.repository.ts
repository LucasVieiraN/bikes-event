import { Injectable } from "@nestjs/common";
import { Tokens } from "@prisma/client";

import { PrismaService } from "../../../database/prisma.service";
import { CreateAuthTokensDtoInput, CreateAuthTokensDtoOutput } from "../dto/create-auth-tokens.dto";

@Injectable()
export class TokensRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ accessToken, refreshToken, expiresDate, userId }: CreateAuthTokensDtoInput): Promise<CreateAuthTokensDtoOutput> {
    const token = await this.prisma.tokens.create({
      data: { accessToken, refreshToken, userId, expiresAt: expiresDate },
      select: { accessToken: true, refreshToken: true, expiresAt: true }
    })

    return token
  }

  async updateAccessToken(userId: string, accessToken: string): Promise<Tokens> {
    return this.prisma.tokens.update({ where: { userId }, data: { accessToken } })
  }

  async findById(userId: string): Promise<Tokens | null> {
    return this.prisma.tokens.findFirst({ where: { userId } })
  }

  async findByRefreshToken(refreshToken: string): Promise<Tokens | null> {
    return this.prisma.tokens.findFirst({ where: { refreshToken } })
  }

  async delete(userId: string): Promise<void> {
    await this.prisma.tokens.delete({ where: { userId } })
  }
}
