import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument } from './note.schema';
import mongoose from 'mongoose';
import { NoteDto } from './dto/note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteModel: mongoose.Model<Note>,
  ) {}

  async findAll(): Promise<NoteDocument[]> {
    return this.noteModel.find().populate('created_by').exec();
  }

  async findOne(id: string): Promise<NoteDocument> {
    return this.noteModel.findById(id).populate('created_by').exec();
  }

  async create(data: NoteDto): Promise<NoteDocument> {
    const newNote = new this.noteModel(data);

    return (await newNote.save()).populate('created_by');
  }

  async update(id: string, data: Partial<Note>): Promise<NoteDocument> {
    return this.noteModel
      .findByIdAndUpdate(id, data)
      .populate('created_by')
      .exec();
  }

  async delete(id: string): Promise<NoteDocument> {
    return this.noteModel.findByIdAndDelete(id);
  }
}
