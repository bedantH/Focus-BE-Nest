import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';

export type NoteDocument = HydratedDocument<Note>;

@Schema({
  timestamps: true,
})
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  created_by: User;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
