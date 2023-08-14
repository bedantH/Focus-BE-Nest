import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Session } from 'src/session/session.schema';
import * as bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;
export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, validate: /\S+@\S+\.\S+/, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop([
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Session',
    },
  ])
  sessions: Session[];

  @Prop({
    default: false,
  })
  isInternal: boolean;
  comparePassword?: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// eslint-disable-next-line prettier/prettier
export { UserSchema };