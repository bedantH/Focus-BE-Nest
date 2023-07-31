import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Session } from 'src/session/session.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session',
    },
  ])
  sessions: Session[];

  @Prop()
  isInternal: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
