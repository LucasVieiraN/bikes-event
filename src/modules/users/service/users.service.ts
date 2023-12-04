import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';

import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FindUsersOutput } from '../dto/find-users-output';
import { UsersRepository } from '../repository/users.repository';
import { PrismaService } from '../../../database/prisma.service';
import { CreateAccountDto } from '../../../modules/auth/dto/create-account.dto';
import { validateAndFormatCPF } from '../../../utils/validate-and-format-cpf';
import { isPasswordValid } from '../../../utils/is-password-valid';
import { hashPassword } from '../../../utils/hash-password';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService, private readonly usersRepository: UsersRepository) {}

  async create({ cpf, email, name, password }: CreateAccountDto): Promise<User> {
    const cpfValidatedAndFormated = validateAndFormatCPF(cpf)
    isPasswordValid(password)
    const hashedPassword = await hashPassword(password)
    const findUserByCPF = await this.usersRepository.findByCPF(cpfValidatedAndFormated)
    const findUserByEmail = await this.usersRepository.findByEmail(email)

    if (findUserByCPF) {
      throw new HttpException('Cpf is a single field.', 400)
    }

    if (findUserByEmail) {
      throw new HttpException('Email is a single field.', 400)
    }

    return this.usersRepository.create({ cpf: cpfValidatedAndFormated, email: email.toLowerCase(), name: name.toLowerCase(), password: hashedPassword })
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new HttpException('Email not found!', 404)
    }

    return user
  }

  async findAllUsers(): Promise<FindUsersOutput[]> {
    return this.usersRepository.findAllUsers()
  }

  async findUserById(id: string): Promise<FindUsersOutput> {
    const user = await this.usersRepository.findUserById(id).catch(e => { return e })

    if (!user) {
      throw new HttpException('User not found!', 404)
    }

    return user
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    const userUpdated = await this.usersRepository.updateUser(id, updateUserDto).catch(e => { return e })

    if (userUpdated.code === 'P2025') {
      throw new HttpException('User not found!', 404)
    }

    return userUpdated
  }

  async removeUser(id: string): Promise<void> {
    await this.usersRepository.deleteUser(id)
  }
}
