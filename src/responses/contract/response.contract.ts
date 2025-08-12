import { Document } from 'mongoose';

export type Response = {
  element_id: string;
  question: string | null | undefined;
  response:
    | string
    | { description: string; value: string }
    | { description: string; value: string }[]
    | undefined;
};

export interface Responses extends Document {
  id: string;
  form_id: string;
  responses: Response[];
}
