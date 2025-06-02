import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { Categories } from '../../../db/category-entities/category.entity';

export class UpdateCategoryDto extends PartialType(Categories) {
  @IsOptional()
  category_name?: string;

  @IsOptional()
  @IsNumber()
  parent_id?: number;
}
