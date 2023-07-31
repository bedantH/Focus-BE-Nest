import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restriction } from './restriction.schema';
import mongoose from 'mongoose';

@Injectable()
export class RestrictionsService {
  constructor(
    @InjectModel(Restriction.name)
    private restrictionModel: mongoose.Model<Restriction>,
  ) {}

  async findAll(): Promise<Restriction[]> {
    return this.restrictionModel.find().exec();
  }

  async findById(id: string): Promise<Restriction> {
    return this.restrictionModel.findById(id);
  }

  async create(data: Restriction): Promise<Restriction> {
    const newRestriction = new this.restrictionModel(data);

    return newRestriction.save();
  }

  async update(id: string, data: Partial<Restriction>): Promise<Restriction> {
    return this.restrictionModel.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<Restriction> {
    return this.restrictionModel.findByIdAndDelete(id);
  }
}
