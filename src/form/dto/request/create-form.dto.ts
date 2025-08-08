import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Element } from '../../contracts/element.contract';

export class CreateFormDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsOptional()
  itemsPerpage: number | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Element)
  elements: Element[];
}
