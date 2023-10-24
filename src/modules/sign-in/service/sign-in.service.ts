import { HttpException, Injectable } from '@nestjs/common';

import { compareSync } from 'bcryptjs';

import { LoginDto } from '../dto/login.dto';
import { UsersRepository } from 'src/modules/users/repository/users.repository';

@Injectable()
export class SignInService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signIn(loginDto: LoginDto) {
    const user = await this.usersRepository.findByEmail(loginDto.email)

    if (!user) {
      throw new HttpException('Invalid credentials!', 409)
    }

    const isMatchPassword = compareSync(loginDto.password, user.password)

    if (!isMatchPassword) {
      throw new HttpException('Invalid credentials!', 409)
    }
  }
}
