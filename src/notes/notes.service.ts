import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './note.schema';
import mongoose from 'mongoose';
import { NoteDto } from './dto/note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteModel: mongoose.Model<Note>,
  ) {}

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  async findOne(id: string): Promise<Note> {
    return this.noteModel.findById(id);
  }

  async create(data: NoteDto): Promise<Note> {
    const newNote = new this.noteModel(data);

    return newNote.save();
  }

  async update(id: string, data: Partial<Note>): Promise<Note> {
    return this.noteModel.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<Note> {
    return this.noteModel.findByIdAndDelete(id);
  }
}
