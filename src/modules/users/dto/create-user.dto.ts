import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  name: string

  @IsString()
  @MinLength(11, { message: 'The CPF can only contain 11 digits.' })
  @MaxLength(11, { message: 'The CPF can only contain 11 digits.' })
  cpf: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6, { message: 'Password must contain at least 6 characters.' })
  password: string
}
