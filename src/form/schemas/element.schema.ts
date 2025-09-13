import * as mongoose from 'mongoose';
import { availablePositions, availableTypes } from '../constants/element-types';
import type { Element } from '../contracts/element.contract';

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
    multiple: { type: Boolean, default: false },
    order: { type: Number, default: false },
    position: {
      type: String,
      enum: availablePositions,
      require: false,
    },
  },
  { _id: false },
);
