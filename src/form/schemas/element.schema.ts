import * as mongoose from 'mongoose';
import type { Element } from '../contracts/element.contract';
import { availableTypes } from '../constants/element-types';

export const ElementSchema = new mongoose.Schema<Element>(
  {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: availableTypes,
      required: true,
    },
    label: { type: String, default: null },
    name: { type: String, default: null },
    placeholder: { type: String, default: null },
    options: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    required: { type: Boolean, default: false },
    elements: { type: [], default: [] },
  },
  { _id: false },
);
