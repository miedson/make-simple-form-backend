import { Document } from 'mongoose';

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
  elements: Element[];
}
