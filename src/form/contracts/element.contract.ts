import { Document } from 'mongoose';
import { availablePositions } from '../constants/element-types';

export interface Element extends Document {
  type: 'input' | 'select' | 'radio' | 'checkbox' | 'textarea';
  label?: string | null;
  name?: string | null;
  placeholder?: string | null;
  options?: {
    label: string;
    value: string;
  }[];
  required?: boolean;
  multiple?: boolean;
  order?: number;
  position: keyof typeof availablePositions;
}
