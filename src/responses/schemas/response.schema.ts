import mongoose from 'mongoose';
import { Responses } from '../contract/response.contract';

export const responseSchema = new mongoose.Schema<Responses>(
  {
    form_id: { type: String },
    responses: { type: [] },
  },
  { timestamps: true },
);
