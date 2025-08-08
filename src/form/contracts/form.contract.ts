import { Document } from 'mongoose';
import type { Element } from '../contracts/element.contract';

export interface Form extends Document {
  id: string;
  name: string | null;
  description: string | null;
  itemsPerPage: number | null;
  elements?: Element[];
  published: boolean;
}
