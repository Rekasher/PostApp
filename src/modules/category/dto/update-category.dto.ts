import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsOptional()
  @IsNotEmpty({ message: 'name is required' })
  category_name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'email is required' })
  @IsNumber()
  parent_id?: number;
}
