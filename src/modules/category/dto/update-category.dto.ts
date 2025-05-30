import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Categories } from '../../../db/category-entities/category.entity';

export class UpdateCategoryDto extends PartialType(Categories) {
  @IsOptional()
  @IsNotEmpty({ message: 'name is required' })
  category_name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'email is required' })
  @IsNumber()
  parent_id?: number;
}
