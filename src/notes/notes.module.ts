import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './note.schema';
import { SessionSchema } from 'src/session/session.schema';
import { SessionService } from 'src/session/session.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Note',
        schema: NoteSchema,
      },
      {
        name: 'Session',
        schema: SessionSchema,
      },
    ]),
  ],
  controllers: [NotesController],
  providers: [NotesService, SessionService],
})
export class NotesModule {}
