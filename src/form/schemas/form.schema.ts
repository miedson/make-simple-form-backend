import * as mongoose from 'mongoose';
import { ElementSchema } from './element.schema';
import { Form } from '../contracts/form.contract';

export const formSchema = new mongoose.Schema<Form>(
  {
    _id: { type: String },
    name: { type: String, default: null },
    description: { type: String, default: null },
    itemsPerPage: { type: Number, default: null },
    elements: { type: [ElementSchema], default: [] },
    published: { type: Boolean, default: false },
  },
  { timestamps: true },
);
