import { Module } from '@nestjs/common';
import { RestrictionsController } from './restrictions.controller';
import { RestrictionsService } from './restrictions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RestrictionSchema } from './restriction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Restriction',
        schema: RestrictionSchema,
      },
    ]),
  ],
  controllers: [RestrictionsController],
  providers: [RestrictionsService],
})
export class RestrictionsModule {}
