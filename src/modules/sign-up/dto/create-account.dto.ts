import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateAccountDto {
  @IsString()
  name: string

  @IsString()
  @MinLength(11, { message: 'The CPF can contain at least 11 digits without periods and hyphens.' })
  @MaxLength(14, { message: 'The CPF can contain a maximum of 14 digits with periods and hyphens.' })
  cpf: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6, { message: 'Password must contain at least 6 characters.' })
  password: string
}