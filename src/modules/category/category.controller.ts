import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() body: CreateCategoryDto) {
    try {
      return await this.categoryService.create(body);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.categoryService.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    try {
      return await this.categoryService.findById(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return await this.categoryService.delete(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
