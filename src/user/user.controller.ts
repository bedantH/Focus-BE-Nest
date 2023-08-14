import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

import {
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Body,
  Param,
  Logger,
} from '@nestjs/common';
import { User } from './user.schema';
import { UserDto } from './dto/user.dto';

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
  @Post('register')
  async create(@Body() data: UserDto): Promise<IResponse> {
    try {
      const user = await this.userService.create(data);

      if (typeof user === 'string') {
        return {
          status: 400,
          message: user,
          data: null,
        };
      } else {
        return {
          status: 200,
          message: 'User created successfully',
          data: user,
        };
      }
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

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() data: { email: string; password: string },
  ): Promise<IResponse> {
    try {
      const user:
        | User
        | {
            email?: boolean;
            password?: boolean;
          } = await this.userService.login(data?.email, data?.password);

      Logger.log('User', user);

      if (!user) {
        return {
          status: 400,
          message: 'User not found. Please register!',
          data: null,
        };
      }

      if (user.email === true) {
        return {
          status: 400,
          message: 'Email not found. Please register!',
          data: null,
        };
      }

      if (user.password === true) {
        return {
          status: 400,
          message: 'Password is incorrect. Please try again!',
          data: null,
        };
      }

      return {
        status: 200,
        message: 'User logged in successfully',
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
