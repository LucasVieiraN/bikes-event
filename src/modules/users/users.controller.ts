import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ErrorException } from '../../errors/exceptions';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.createUser(createUserDto);
    } catch (e) {
      throw new ErrorException(e)
    }
  }


  @Get()
  async findAll() {
    try {
      return this.usersService.findAllUsers();
    } catch (e) {
      throw new ErrorException(e)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return this.usersService.findOneUser(id);
    } catch (e) {
      throw new ErrorException(e)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.updateUser(id, updateUserDto);
    } catch (e) {
      throw new ErrorException(e)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.usersService.removeUser(id);
    } catch (e) {
      throw new ErrorException(e)
    }
  }
}
