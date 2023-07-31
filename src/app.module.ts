import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionModule } from './session/session.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { NotesModule } from './notes/notes.module';
import { RestrictionsModule } from './restrictions/restrictions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    SessionModule,
    TasksModule,
    UserModule,
    NotesModule,
    RestrictionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
