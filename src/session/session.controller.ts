import { Controller } from '@nestjs/common';
import { SessionService } from './session.service';
import { Get, Post, Put, Delete, HttpCode, Param, Body } from '@nestjs/common';
import { Session } from './session.schema';
import { Note } from 'src/notes/note.schema';
import { Task } from 'src/tasks/tasks.schema';
import { Restriction } from 'src/restrictions/restriction.schema';

@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

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
      const session = this.sessionService.findById(id);

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
    @Body() data: { note: Note },
  ): Promise<IResponse> {
    try {
      const session = await this.sessionService.addNoteToSession(id, data.note);

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
    @Body() data: { task: Task },
  ): Promise<IResponse> {
    try {
      const session = await this.sessionService.addTaskToSession(id, data.task);

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
    @Body() data: { restriction: Restriction },
  ): Promise<IResponse> {
    try {
      const session = await this.sessionService.addRestrictionToSession(
        id,
        data.restriction,
      );

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
