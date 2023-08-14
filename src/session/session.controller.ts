import { Controller, Logger } from '@nestjs/common';
import { SessionService } from './session.service';
import { Get, Post, Put, Delete, HttpCode, Param, Body } from '@nestjs/common';
import { Session } from './session.schema';
import { Note } from 'src/notes/note.schema';
import { Task } from 'src/tasks/tasks.schema';
import { Restriction } from 'src/restrictions/restriction.schema';
import { UserService } from 'src/user/user.service';
import mongoose, { ObjectId } from 'mongoose';

@Controller('session')
export class SessionController {
  constructor(
    private sessionService: SessionService,
    private userService: UserService,
  ) {}

  @HttpCode(200)
  @Get('all')
  async getAllSessions(): Promise<IResponse> {
    try {
      const sessions = await this.sessionService.findAll();

      return {
        status: 200,
        message: 'Sessions fetched successfully',
        data: sessions,
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
  async getSessionById(@Param('id') id: string): Promise<IResponse> {
    try {
      const session = await this.sessionService.findOne(id);

      if (!session) {
        return {
          status: 400,
          message: 'Session not found',
          data: null,
        };
      }

      return {
        status: 200,
        message: 'Session fetched successfully',
        data: session,
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
  async createSession(@Body() data: Session): Promise<IResponse> {
    try {
      const session = await this.sessionService.create(data);

      this.userService.addSessionToUser(data.created_by, session);

      return {
        status: 200,
        message: 'Session created successfully',
        data: session,
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
  @Put(':id')
  async updateSession(
    @Param('id') id: string,
    @Body() data: Partial<Session>,
  ): Promise<IResponse> {
    try {
      const session = await this.sessionService.update(id, data);

      if (!session) {
        return {
          status: 400,
          message: 'Session not found',
          data: null,
        };
      }

      return {
        status: 200,
        message: 'Session updated successfully',
        data: session,
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
  @Delete(':id')
  async deleteSession(@Param('id') id: string): Promise<IResponse> {
    try {
      const session = await this.sessionService.delete(id);

      if (!session) {
        return {
          status: 400,
          message: 'Session not found',
          data: null,
        };
      }

      return {
        status: 200,
        message: 'Session deleted successfully',
        data: session,
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

  // Get All
  @HttpCode(200)
  @Get('all/notes/:id')
  async getAllNotes(@Param('id') id: string): Promise<IResponse> {
    try {
      const notes = await this.sessionService.getNotesFromSession(id);

      return {
        status: 200,
        message: 'Notes fetched successfully',
        data: notes,
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
  @Get('all/tasks/:id')
  async getAllTasks(@Param('id') id: string): Promise<IResponse> {
    try {
      const tasks = await this.sessionService.getTasksFromSession(id);

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

  @HttpCode(200)
  @Get('all/restrictions/:id')
  async getAllRestrictions(@Param('id') id: string): Promise<IResponse> {
    try {
      const restrictions = await this.sessionService.getRestrictionsFromSession(
        id,
      );

      return {
        status: 200,
        message: 'Restrictions fetched successfully',
        data: restrictions,
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
  @Post('session/:id/add/note')
  async addNoteToSession(
    @Param('id') id: string,
    @Body() note_id: string,
  ): Promise<IResponse> {
    try {
      const session = await this.sessionService.addNoteToSession(
        id,
        note_id as unknown as mongoose.Types.ObjectId,
      );

      if (!session) {
        return {
          status: 400,
          message: 'Session not found',
          data: null,
        };
      }

      return {
        status: 200,
        message: 'Note added to session successfully',
        data: session,
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
  @Post('session/:id/add/task')
  async addTaskToSession(
    @Param('id') id: string,
    @Body() task_id: string,
  ): Promise<IResponse> {
    try {
      const session = await this.sessionService.addTaskToSession(
        id,
        task_id as unknown as mongoose.Types.ObjectId,
      );

      if (!session) {
        return {
          status: 400,
          message: 'Session not found',
          data: null,
        };
      }

      return {
        status: 200,
        message: 'Task added to session successfully',
        data: session,
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
  @Post('session/:id/add/restriction')
  async addRestrictionToSession(
    @Param('id') id: string,
    @Body() restriction_id: string,
  ): Promise<IResponse> {
    try {
      const session = await this.sessionService.addRestrictionToSession(
        id,
        restriction_id as unknown as mongoose.Types.ObjectId,
      );

      if (!session) {
        return {
          status: 400,
          message: 'Session not found',
          data: null,
        };
      }

      return {
        status: 200,
        message: 'Restriction added to session successfully',
        data: session,
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

  @HttpCode(201)
  @Post('session/:id/remove/note/:noteId')
  async removeNoteFromSession(
    @Param('id') id: string,
    @Param('noteId') noteId: string,
  ): Promise<IResponse> {
    try {
      const session = await this.sessionService.removeNoteFromSession(
        id,
        noteId,
      );

      if (!session) {
        return {
          status: 400,
          message: 'Session not found',
          data: null,
        };
      }

      return {
        status: 201,
        message: 'Note removed from session successfully',
        data: session,
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

  @HttpCode(201)
  @Post('session/:id/remove/task/:taskId')
  async removeTaskFromSession(
    @Param('id') id: string,
    @Param('taskId') taskId: string,
  ): Promise<IResponse> {
    try {
      const session = await this.sessionService.removeTaskFromSession(
        id,
        taskId,
      );

      if (!session) {
        return {
          status: 400,
          message: 'Session not found',
          data: null,
        };
      }

      return {
        status: 201,
        message: 'Task removed from session successfully',
        data: session,
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

  @HttpCode(201)
  @Post('session/:id/remove/restriction/:restrictionId')
  async removeRestrictionFromSession(
    @Param('id') id: string,
    @Param('restrictionId') restrictionId: string,
  ): Promise<IResponse> {
    try {
      const session = await this.sessionService.removeRestrictionFromSession(
        id,
        restrictionId,
      );

      if (!session) {
        return {
          status: 400,
          message: 'Session not found',
          data: null,
        };
      }

      return {
        status: 201,
        message: 'Restriction removed from session successfully',
        data: session,
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
