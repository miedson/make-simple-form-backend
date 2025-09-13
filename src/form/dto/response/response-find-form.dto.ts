import { Expose, Type } from 'class-transformer';
import { availablePositions } from '../../constants/element-types';

class OptionResponseDto {
  @Expose()
  label: string;

  @Expose()
  value: string;
}

class ElementResponseDto {
  @Expose()
  id: string;

  @Expose()
  type:
    | 'input'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'textarea'
    | 'file'
    | 'date'
    | 'container';

  @Expose()
  label?: string;

  @Expose()
  placeholder?: string;

  @Expose()
  required?: boolean;

  @Expose()
  multiple?: boolean;

  @Expose()
  order?: number;

  @Expose()
  position: keyof typeof availablePositions;

  @Expose()
  @Type(() => OptionResponseDto)
  options?: OptionResponseDto[];

  @Expose()
  @Type(() => OptionResponseDto)
  elements?: ElementResponseDto[];
}

export class ResponseFindFormDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  itemsPerPage: number;

  @Expose()
  @Type(() => ElementResponseDto)
  elements: ElementResponseDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
