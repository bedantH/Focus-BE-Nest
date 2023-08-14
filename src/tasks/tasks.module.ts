import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './tasks.schema';
import { SessionService } from 'src/session/session.service';
import { SessionSchema } from 'src/session/session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Task',
        schema: TaskSchema,
      },
      {
        name: 'Session',
        schema: SessionSchema,
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService, SessionService],
})
export class TasksModule {}
