import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'content is required' })
  @IsString()
  content: string;

  @IsNotEmpty({ message: 'category is required' })
  @IsNumber()
  category_id: number;

  @IsNotEmpty({ message: 'user is required' })
  @IsNumber()
  user_id: number;
}
