import { HttpException, Injectable } from '@nestjs/common';

import { CreateAccountDto } from '../dto/create-account.dto';
import { SignUpRepository } from '../repository/sign-up.repository';
import { UsersRepository } from '../../../modules/users/repository/users.repository';
import { validateAndFormatCPF } from '../../../utils/validate-and-format-cpf';
import { hashPassword } from '../../../utils/hash-password';
import { isPasswordValid } from '../../../utils/is-password-valid';

@Injectable()
export class SignUpService {
  constructor(private readonly signUpRepository: SignUpRepository, private readonly usersRepository: UsersRepository) {}

  async signUp({ cpf, email, name, password }: CreateAccountDto) {
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

    await this.signUpRepository.create({ cpf: cpfValidatedAndFormated, email: email.toLowerCase(), name: name.toLowerCase(), password: hashedPassword })
  }
}
