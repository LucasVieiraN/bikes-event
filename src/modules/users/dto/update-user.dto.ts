import { PartialType } from '@nestjs/mapped-types';
import { IsString, MinLength } from 'class-validator';

import { CreateAccountDto } from '../../../modules/sign-up/dto/create-account.dto';

export class UpdateUserDto extends PartialType(CreateAccountDto) {
  @IsString()
  name?: string;

  @MinLength(6, { message: 'Password must contain at least 6 characters.' })
  password?: string;
}
