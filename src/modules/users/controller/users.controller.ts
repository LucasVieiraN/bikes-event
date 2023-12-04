import { Controller, Get, Body, Patch, Param, Delete, HttpException, UseGuards } from '@nestjs/common';

import { UsersService } from '../service/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LocalAuthGuard } from '../../../modules/auth/guards/local-auth.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(LocalAuthGuard)
  async findAll() {
    try {
      return this.usersService.findAllUsers();
    } catch (e) {
      throw new HttpException(e.message, e.status)
    }
  }

  @Get(':id')
  @UseGuards(LocalAuthGuard)
  async findOne(@Param('id') id: string) {
    try {
      return this.usersService.findUserById(id);
    } catch (e) {
      throw new HttpException(e.message, e.status)
    }
  }

  @Patch(':id')
  @UseGuards(LocalAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.updateUser(id, updateUserDto);
    } catch (e) {
      throw new HttpException(e.message, e.status)
    }
  }

  @Delete(':id')
  @UseGuards(LocalAuthGuard)
  async remove(@Param('id') id: string) {
    try {
      return this.usersService.removeUser(id);
    } catch (e) {
      throw new HttpException(e.message, e.status)
    }
  }
}
