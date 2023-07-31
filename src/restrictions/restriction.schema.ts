import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type RestrictionDocument = HydratedDocument<Restriction>;

@Schema({
  timestamps: true,
})
export class Restriction {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    validate: (value) => value.startsWith('http') || value.startsWith('https'),
  })
  url: string;

  @Prop()
  hostname: string;

  @Prop()
  isAllowed: boolean;

  @Prop()
  restricted_count: number;
}

export const RestrictionSchema = SchemaFactory.createForClass(Restriction);
