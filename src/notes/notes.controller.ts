import { Controller } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.schema';
import {
  Body,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common/decorators';
import { NoteDto } from './dto/note.dto';
import { SessionService } from 'src/session/session.service';

@Controller('notes')
export class NotesController {
  constructor(
    private noteService: NotesService,
    private sessionService: SessionService,
  ) {}

  @HttpCode(200)
  @Get('all')
  async getAllNotes(): Promise<IResponse> {
    // error handling
    try {
      const notes = await this.noteService.findAll();

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
  @Get(':id')
  async getOneNoteById(@Param('id') id: string): Promise<IResponse> {
    try {
      const note = this.noteService.findOne(id);

      return {
        status: 200,
        message: 'Note fetched successfully',
        data: note,
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
  async createNewNote(@Body() data: NoteDto): Promise<IResponse> {
    try {
      const newNote = await this.noteService.create(data);

      this.sessionService.addNoteToSession(data.session, newNote);

      return {
        status: 200,
        message: 'Note created successfully',
        data: newNote,
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
  async updateNoteById(
    @Param('id') id: string,
    @Body() data: Partial<Note>,
  ): Promise<IResponse> {
    try {
      const updatedNote = await this.noteService.update(id, data);

      return {
        status: 200,
        message: 'Note updated successfully',
        data: updatedNote,
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
  @Delete('/:id')
  async deleteNoteById(@Param('id') id: string): Promise<IResponse> {
    try {
      const deletedNote = await this.noteService.delete(id);

      return {
        status: 200,
        message: 'Note deleted successfully',
        data: deletedNote,
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
