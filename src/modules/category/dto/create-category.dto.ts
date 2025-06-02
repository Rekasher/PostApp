import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  category_name: string;

  @IsOptional()
  @IsNumber()
  parent_id?: number;
}
