import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Session, SessionDocument } from './session.schema';
import { NoteDocument } from 'src/notes/note.schema';
import { RestrictionDocument } from 'src/restrictions/restriction.schema';
import { TaskDocument } from 'src/tasks/tasks.schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel('Session')
    private sessionModel: mongoose.Model<SessionDocument>,
  ) {}

  async findAll(): Promise<SessionDocument[]> {
    // populate notes, restrictions, tasks
    const sessions = this.sessionModel
      .find()
      .populate('tasks')
      .populate('notes')
      .populate('restrictions')
      .exec();

    return sessions;
  }

  async findOne(id: string): Promise<SessionDocument> {
    const session = this.sessionModel
      .findById(id)
      .populate('tasks')
      .populate('notes')
      .populate('restrictions')
      .exec();

    return session;
  }

  async create(data: Session): Promise<SessionDocument> {
    const newSession = new this.sessionModel(data);

    return newSession.save();
  }

  async update(id: string, data: Partial<Session>): Promise<SessionDocument> {
    return this.sessionModel.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<SessionDocument> {
    return this.sessionModel.findByIdAndDelete(id);
  }

  async addNoteToSession(
    sessionId: string,
    note: mongoose.Types.ObjectId,
  ): Promise<SessionDocument> {
    const session = await this.sessionModel.findByIdAndUpdate(sessionId, {
      $push: { notes: note as unknown as string },
    });

    return session.save();
  }

  async removeNoteFromSession(
    sessionId: string,
    noteId: string,
  ): Promise<SessionDocument> {
    const session = await this.sessionModel.findById(sessionId);
    session.notes = session.notes.filter((note: any) => note._id !== noteId);

    return session.save();
  }

  async addRestrictionToSession(
    sessionId: string,
    restriction: mongoose.Types.ObjectId,
  ): Promise<SessionDocument> {
    const session = await this.sessionModel.findByIdAndUpdate(sessionId, {
      $push: { restrictions: restriction as unknown as string },
    });

    return session.save();
  }

  async removeRestrictionFromSession(
    sessionId: string,
    restrictionId: string,
  ): Promise<SessionDocument> {
    const session = await this.sessionModel.findById(sessionId);
    session.restrictions = session.restrictions.filter(
      (restriction: any) => restriction._id !== restrictionId,
    );

    return session.save();
  }

  async addTaskToSession(
    sessionId: string,
    task: mongoose.Types.ObjectId,
  ): Promise<SessionDocument> {
    const session = await this.sessionModel.findByIdAndUpdate(sessionId, {
      $push: { tasks: task as unknown as string },
    });

    return session.save();
  }

  async removeTaskFromSession(
    sessionId: string,
    taskId: string,
  ): Promise<SessionDocument> {
    const session = await this.sessionModel.findById(sessionId);
    session.tasks = session.tasks.filter((task: any) => task._id !== taskId);

    return session.save();
  }

  async getNotesFromSession(sessionId: string): Promise<NoteDocument[]> {
    const session = await this.sessionModel
      .findById(sessionId)
      .populate('notes');

    return session.notes as unknown as NoteDocument[];
  }

  async getRestrictionsFromSession(
    sessionId: string,
  ): Promise<RestrictionDocument[]> {
    const session = await this.sessionModel
      .findById(sessionId)
      .populate('restrictions');

    return session.restrictions as unknown as RestrictionDocument[];
  }

  async getTasksFromSession(sessionId: string): Promise<TaskDocument[]> {
    const session = await this.sessionModel
      .findById(sessionId)
      .populate('tasks');

    return session.tasks as unknown as TaskDocument[];
  }
}
