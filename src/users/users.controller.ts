import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UpdateUserSettingDto } from './dtos/UpdateUserSetting.dto';

@Controller('users')
export class UsersController {
  constructor(private userserive: UsersService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() data: CreateUserDto) {
    return this.userserive.createUser(data);
  }

  @Get()
  getUsers() {
    return this.userserive.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userserive.getUserById(id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  @Patch(':id')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateUserDto,
  ) {
    return this.userserive.updateUserById(id, updateData);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userserive.deleteUserById(id);
  }

  @Patch(':id/settings')
  updateUserSettingById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserSetting: UpdateUserSettingDto,
  ) {
    return this.userserive.updateUserSettingById(id, updateUserSetting);
  }
}
