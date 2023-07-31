import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Priority, Status, Task } from './tasks.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: mongoose.Model<Task>) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findById(id: string): Promise<Task> {
    return this.taskModel.findById(id);
  }

  async create(data: Task): Promise<Task> {
    const newTask = new this.taskModel(data);

    return newTask.save();
  }

  async update(id: string, data: Partial<Task>): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id);
  }

  async updateStatus(id: string, status: Status): Promise<Task> {
    const task = await this.taskModel.findById(id);

    task.status = status;

    return task.save();
  }

  async updatePriority(id: string, priority: Priority): Promise<Task> {
    const task = await this.taskModel.findById(id);

    task.priority = priority;

    return task.save();
  }
}
