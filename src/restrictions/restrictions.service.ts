import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restriction, RestrictionDocument } from './restriction.schema';
import mongoose from 'mongoose';

@Injectable()
export class RestrictionsService {
  constructor(
    @InjectModel(Restriction.name)
    private restrictionModel: mongoose.Model<RestrictionDocument>,
  ) {}

  async findAll(): Promise<RestrictionDocument[]> {
    return this.restrictionModel.find().exec();
  }

  async findById(id: string): Promise<RestrictionDocument> {
    return this.restrictionModel.findById(id);
  }

  async create(data: Restriction): Promise<RestrictionDocument> {
    const newRestriction = new this.restrictionModel(data);

    return await newRestriction.save();
  }

  async update(
    id: string,
    data: Partial<Restriction>,
  ): Promise<RestrictionDocument> {
    return this.restrictionModel.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<RestrictionDocument> {
    return this.restrictionModel.findByIdAndDelete(id);
  }
}
