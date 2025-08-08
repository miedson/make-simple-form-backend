import mongoose from 'mongoose';
import { Response } from '../contract/response.contract';

export const responseSchema = new mongoose.Schema<Response>(
  {
    form_id: { type: String },
    responses: { type: {} },
  },
  { timestamps: true },
);
