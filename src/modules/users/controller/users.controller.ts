import { Controller, Get, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';

import { UsersService } from '../service/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    try {
      return this.usersService.findAllUsers();
    } catch (e) {
      throw new HttpException(e.message, e.status)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findUserById(id);
      return user
    } catch (e) {
      throw new HttpException(e.message, e.status)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.updateUser(id, updateUserDto);
    } catch (e) {
      throw new HttpException(e.message, e.status)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.usersService.removeUser(id);
    } catch (e) {
      throw new HttpException(e.message, e.status)
    }
  }
}
