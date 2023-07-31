import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

import { Get, Post, Put, Delete, HttpCode, Body, Param } from '@nestjs/common';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Get('all')
  async findAll(): Promise<IResponse> {
    try {
      const users = await this.userService.findAll();

      return {
        status: 200,
        message: 'Users fetched successfully',
        data: users,
      };
    } catch (err) {
      return {
        status: 500,
        message: 'Internal server error',
        data: null,
        err,
      };
    }
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse> {
    try {
      const user = await this.userService.findById(id);

      return {
        status: 200,
        message: 'User fetched successfully',
        data: user,
      };
    } catch (err) {
      return {
        status: 500,
        message: 'Internal server error',
        data: null,
        err,
      };
    }
  }

  @HttpCode(200)
  @Post('create')
  async create(@Body() data: User): Promise<IResponse> {
    try {
      const user = await this.userService.create(data);

      return {
        status: 200,
        message: 'User created successfully',
        data: user,
      };
    } catch (err) {
      return {
        status: 500,
        message: 'Internal server error',
        data: null,
        err,
      };
    }
  }

  @HttpCode(200)
  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<User>,
  ): Promise<IResponse> {
    try {
      const user = await this.userService.update(id, data);

      return {
        status: 200,
        message: 'User updated successfully',
        data: user,
      };
    } catch (err) {
      return {
        status: 500,
        message: 'Internal server error',
        data: null,
        err,
      };
    }
  }

  @HttpCode(200)
  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<IResponse> {
    try {
      const user = await this.userService.delete(id);

      return {
        status: 200,
        message: 'User deleted successfully',
        data: user,
      };
    } catch (err) {
      return {
        status: 500,
        message: 'Internal server error',
        data: null,
        err,
      };
    }
  }
}
