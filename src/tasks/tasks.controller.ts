import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Get, Post, Put, Delete, HttpCode, Param, Body } from '@nestjs/common';
import { Task } from './tasks.schema';
import { SessionService } from 'src/session/session.service';

@Controller('task')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private sessionService: SessionService,
  ) {}

  @Get('all')
  async findAll(): Promise<IResponse> {
    try {
      const tasks = await this.tasksService.findAll();

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
      const task = await this.tasksService.findById(id);

      if (!task) {
        return {
          status: 404,
          message: 'Task not found',
          data: null,
        };
      }

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

      this.sessionService.addTaskToSession(data.session, task._id);

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

      if (!task) {
        return {
          status: 404,
          message: 'Task not found',
          data: null,
        };
      }

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

      if (!task) {
        return {
          status: 404,
          message: 'Task not found',
          data: null,
        };
      }

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
