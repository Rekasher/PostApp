import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRole } from '../../db/user-entities/user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() body: CreateCategoryDto) {
    try {
      return await this.categoryService.create(body);
    } catch (error) {
      throw new BadRequestException(error, 'Not valid data');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.categoryService.findAll();
    } catch (error) {
      throw new BadRequestException(error, 'Not valid data');
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    try {
      return await this.categoryService.findById(id);
    } catch (error) {
      throw new BadRequestException(error, 'Not valid data');
    }
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: number) {
    try {
      await this.categoryService.delete(id);
      return {
        success: true,
        message: 'Category deleted successfully.',
      };
    } catch (error) {
      throw new BadRequestException(error, 'Not valid data');
    }
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: number, @Body() body: UpdateCategoryDto) {
    try {
      await this.categoryService.update(id, body);
      return {
        success: true,
        message: 'Category was updated successfully',
      };
    } catch (error) {
      throw new BadRequestException(error, 'Not valid data');
    }
  }
}
