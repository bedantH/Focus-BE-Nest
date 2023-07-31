import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';
import { Note } from 'src/notes/note.schema';
import { Restriction } from 'src/restrictions/restriction.schema';
import { Task } from 'src/tasks/tasks.schema';

export type SessionDocument = HydratedDocument<Session>;

@Schema({
  timestamps: true,
})
export class Session {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  start_time: Date;

  @Prop()
  end_time: Date;

  @Prop()
  duration: number;

  @Prop()
  focus_session_count: number;

  @Prop()
  break_count: number;

  @Prop()
  breaks_skipped: number;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
    },
  ])
  notes: Note[];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ])
  tasks: Task[];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restriction',
    },
  ])
  restrictions: Restriction[];
}

export const SessionSchema = SchemaFactory.createForClass(Session);
