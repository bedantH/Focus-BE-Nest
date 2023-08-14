import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';

export type SessionDocument = HydratedDocument<Session>;

@Schema({
  timestamps: true,
})
export class Session {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: mongoose.Schema.Types.Date })
  start_time: Date;

  @Prop({
    type: mongoose.Schema.Types.Date,
  })
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
  notes: string[];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ])
  tasks: string[];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restriction',
    },
  ])
  restrictions: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  created_by: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
