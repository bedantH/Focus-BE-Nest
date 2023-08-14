import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Session } from './session.schema';
import { Note } from 'src/notes/note.schema';
import { Restriction } from 'src/restrictions/restriction.schema';
import { IRestriction } from 'src/types/restriction';
import { Task } from 'src/tasks/tasks.schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel('Session') private sessionModel: mongoose.Model<Session>,
  ) {}

  async findAll(): Promise<Session[]> {
    // populate notes, restrictions, tasks
    const sessions = this.sessionModel
      .find()
      .populate('tasks')
      .populate('notes')
      .populate('restrictions')
      .exec();

    return sessions;
  }

  async findOne(id: string): Promise<Session> {
    const session = this.sessionModel.findById(id).exec();

    return session;
  }

  async create(data: Session): Promise<Session> {
    const newSession = new this.sessionModel(data);

    return newSession.save();
  }

  async update(id: string, data: Partial<Session>): Promise<Session> {
    return this.sessionModel.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<Session> {
    return this.sessionModel.findByIdAndDelete(id);
  }

  async addNoteToSession(sessionId: string, note: Note): Promise<Session> {
    const session = await this.sessionModel.findById(sessionId);
    session.notes.push(note);

    return session.save();
  }

  async removeNoteFromSession(
    sessionId: string,
    noteId: string,
  ): Promise<Session> {
    const session = await this.sessionModel.findById(sessionId);
    session.notes = session.notes.filter((note: any) => note._id !== noteId);

    return session.save();
  }

  async addRestrictionToSession(
    sessionId: string,
    restriction: Restriction,
  ): Promise<Session> {
    const session = await this.sessionModel.findById(sessionId);
    session.restrictions.push(restriction);

    return session.save();
  }

  async removeRestrictionFromSession(
    sessionId: string,
    restrictionId: string,
  ): Promise<Session> {
    const session = await this.sessionModel.findById(sessionId);
    session.restrictions = session.restrictions.filter(
      (restriction: IRestriction) => restriction._id !== restrictionId,
    );

    return session.save();
  }

  async addTaskToSession(sessionId: string, task: Task): Promise<Session> {
    const session = await this.sessionModel.findById(sessionId);
    session.tasks.push(task);

    return session.save();
  }

  async removeTaskFromSession(
    sessionId: string,
    taskId: string,
  ): Promise<Session> {
    const session = await this.sessionModel.findById(sessionId);
    session.tasks = session.tasks.filter((task: any) => task._id !== taskId);

    return session.save();
  }

  async getNotesFromSession(sessionId: string): Promise<Note[]> {
    const session = await this.sessionModel.findById(sessionId);
    return session.notes;
  }

  async getRestrictionsFromSession(sessionId: string): Promise<Restriction[]> {
    const session = await this.sessionModel.findById(sessionId);
    return session.restrictions;
  }

  async getTasksFromSession(sessionId: string): Promise<Task[]> {
    const session = await this.sessionModel.findById(sessionId);
    return session.tasks;
  }
}
