import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from '../../db/post-entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Categories } from '../../db/category-entities/category.entity';
import { Users } from '../../db/user-entities/user.entity';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [
    CommentModule,
    TypeOrmModule.forFeature([Posts, Users, Categories]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
