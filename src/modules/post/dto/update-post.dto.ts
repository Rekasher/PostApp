import { PartialType } from '@nestjs/mapped-types';
import { Posts } from '../../../db/post-entities/post.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(Posts) {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber()
  category_id?: number;
}
