import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNotEmpty({ message: 'name is required' })
  category_name?: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: "it's not email format" })
  parent_id?: number;
}
