import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: mongoose.Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async create(data: User): Promise<User> {
    const newUser = new this.userModel(data);

    return newUser.save();
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
