import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Get, Post, Put, Delete, HttpCode, Param, Body } from '@nestjs/common';
import { Task } from './tasks.schema';

@Controller('task')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('all')
  async findAll(): Promise<IResponse> {
    try {
      const tasks = this.tasksService.findAll();

      return {
        status: 200,
        message: 'Tasks fetched successfully',
        data: tasks,
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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse> {
    try {
      const task = this.tasksService.findById(id);

      return {
        status: 200,
        message: 'Task fetched successfully',
        data: task,
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

  @Post('create')
  async create(@Body() data: Task): Promise<IResponse> {
    try {
      const task = await this.tasksService.create(data);

      return {
        status: 200,
        message: 'Task created successfully',
        data: task,
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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Task,
  ): Promise<IResponse> {
    try {
      const task = await this.tasksService.update(id, data);

      return {
        status: 200,
        message: 'Task updated successfully',
        data: task,
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

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IResponse> {
    try {
      const task = await this.tasksService.delete(id);

      return {
        status: 200,
        message: 'Task deleted successfully',
        data: task,
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
