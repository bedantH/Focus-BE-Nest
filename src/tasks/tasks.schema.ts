import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';

export type TaskDocument = HydratedDocument<Task>;

export enum Priority {
  LOW = 'LOW',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
}

export enum Status {
  TODO = 'TODO',
  COMPLETED = 'COMPLETED',
}

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  priority: Priority;

  @Prop()
  description: string;

  @Prop({
    type: mongoose.Schema.Types.Date,
  })
  due_date: Date;

  @Prop()
  status: Status;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  created_by: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
