import { Inject, Injectable } from '@nestjs/common';
import { Model, QueryOptions, UpdateQuery } from 'mongoose';
import { DatabaseAdapter } from './database.adapter';

@Injectable()
export class MongoAdapter<T> implements DatabaseAdapter {
  constructor(@Inject('FORM_MODEL') private readonly formModel: Model<T>) {}

  async create<T>(data: T): Promise<void> {
    const createdDocument = new this.formModel(data);
    await createdDocument.save();
  }

  async upsert<T>(
    _id: string,
    data: UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<T | null> {
    return await this.formModel.findByIdAndUpdate(
      {
        _id,
      },
      { $set: { ...data } },
      options,
    );
  }

  async findById<T>(id: string): Promise<T | null> {
    return await this.formModel.findById(id);
  }
}
