import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostAccessGuard } from './guards/post-access.guard';
import { UpdatePostDto } from './dto/update-post.dto';

@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Req() req, @Body() createPostDto: CreatePostDto) {
    try {
      const user_id = req.user.user_id;
      return await this.postService.create({
        ...createPostDto,
        user_id: user_id,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll(@Query('page') page: number) {
    try {
      return await this.postService.findAll(page);
    } catch (error) {
      throw new BadRequestException(error, 'Not valid data');
    }
  }

  @Get('user')
  async findByUser(@Req() req, @Query('page') page: number) {
    try {
      const id = req.user.user_id;

      return await this.postService.findByUser(id, page);
    } catch (error) {
      throw new BadRequestException(error, 'Not valid data');
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    try {
      return await this.postService.findById(id);
    } catch (error) {
      throw new BadRequestException(error, 'Not valid data');
    }
  }

  @Get('category/:id')
  async findByCategory(@Param('id') id: number, @Query('page') page: number) {
    try {
      return await this.postService.findByCategory(id, page);
    } catch (error) {
      throw new BadRequestException(error, 'Not valid data');
    }
  }

  @UseGuards(PostAccessGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return await this.postService.delete(id);
    } catch (error) {
      throw new BadRequestException(error, 'Not valid data');
    }
  }

  @UseGuards(PostAccessGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UpdatePostDto) {
    try {
      return await this.postService.update(id, body);
    } catch (error) {
      throw new BadRequestException(error, 'Not valid data');
    }
  }
}
