import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';
import { UserDto } from './dto/user.dto';
import { Session } from 'src/session/session.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: mongoose.Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async create(data: UserDto): Promise<User | string> {
    const user = await this.userModel.findOne({ email: data.email });

    if (user) {
      return 'User already exists';
    } else {
      const newUser = new this.userModel(data);

      return newUser.save();
    }
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, data);
  }

  async addSessionToUser(id: string, session: Session): Promise<User> {
    Logger.log(session);

    return this.userModel.findByIdAndUpdate(id, {
      $push: { sessions: session },
    });
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }

  async login(
    email: string,
    password: string,
  ): Promise<
    | User
    | {
        email?: boolean;
        password?: boolean;
      }
  > {
    if (!email || !password) {
      return {
        email: !email,
        password: !password,
      };
    }

    const user = await this.userModel.findOne({ email });

    if (!user) {
      return {
        email: true,
        password: false,
      };
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return {
        email: false,
        password: true,
      };
    }

    return user;
  }
}
