import { Document } from 'mongoose';

export type Responses = {
  element_id: string;
  question: string | null | undefined;
  response:
    | string
    | { label: string; value: string }
    | { label: string; value: string }[]
    | undefined;
};

export interface Response extends Document {
  id: string;
  form_id: string;
  responses: Responses;
}
