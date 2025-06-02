import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../../db/post-entities/post.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Users } from '../../db/user-entities/user.entity';
import { Categories } from '../../db/category-entities/category.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { CommentService } from '../comment/comment.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    private readonly commentService: CommentService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const { content, category_id, user_id } = createPostDto;

      const user = await this.usersRepository.findOneByOrFail({ id: user_id });
      const category = await this.categoriesRepository.findOneByOrFail({
        id: category_id,
      });

      const post = this.postRepository.create({ content, category, user });

      return await this.postRepository.save(post);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<Posts[]> {
    try {
      return await this.postRepository.find({
        relations: ['category'],
      });
    } catch (error) {
      throw new NotFoundException(error, 'Posts not found');
    }
  }

  async findById(id: number): Promise<Posts> {
    try {
      return await this.postRepository.findOneOrFail({
        where: { id },
        relations: ['category', 'comments'],
      });
    } catch (error) {
      throw new NotFoundException(error, 'Post not found');
    }
  }

  async findByCategory(id: number): Promise<Posts[]> {
    try {
      return await this.postRepository.find({
        where: { category: { id } },
        relations: ['category'],
      });
    } catch (error) {
      throw new NotFoundException(error, 'Posts not found');
    }
  }

  async findByUser(id: number): Promise<Posts[]> {
    try {
      return await this.postRepository.find({
        where: { user: { id } },
        relations: ['category'],
      });
    } catch (error) {
      throw new NotFoundException(error, 'Posts not found');
    }
  }

  async delete(id: number): Promise<DeleteResult | NotFoundException> {
    try {
      const result = await this.postRepository.findOneOrFail({
        where: { id },
        relations: ['comments'],
      });

      if (!result) return new NotFoundException('Post not found');

      result.comments
        .map((comment) => comment.id)
        .forEach((id) => this.commentService.delete(id));

      return await this.postRepository.delete(id);
    } catch (error) {
      throw new NotFoundException(error, 'Post not found');
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const { content, category_id } = updatePostDto;

      const post = await this.postRepository.findOneByOrFail({ id });

      if (content?.trim()) post.content = content;

      if (category_id) {
        post.category = await this.categoriesRepository.findOneByOrFail({
          id: category_id,
        });
      }

      post.updated_at = new Date();

      return await this.postRepository.save(post);
    } catch (error) {
      throw new NotFoundException(error, 'Post not found');
    }
  }
}
