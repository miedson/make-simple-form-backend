import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('form')
export class FormEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  name: string;
  description: string;
  itemsPerPage: number;
  elements: string;
  published: boolean;
}
