import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Categories } from '../../db/category-entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async create(categoryDto: CreateCategoryDto): Promise<any> {
    try {
      const { category_name, parent_id } = categoryDto;

      let parent_category: Categories | undefined;

      if (parent_id) {
        const existCategory = await this.findById(parent_id);
        if (!existCategory)
          return new BadRequestException('Parent category not found');

        parent_category = existCategory;
      }

      const category = this.categoriesRepository.create({
        category_name,
        parent_category,
      });

      return await this.categoriesRepository.save(category);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<any> {
    try {
      const categories = await this.categoriesRepository.find({
        relations: ['parent_category', 'child_category'],
        where: { parent_category: IsNull() },
      });

      if (!categories || categories.length === 0)
        return new BadRequestException('No categories found');

      return Promise.all(
        categories.map((category) => this.findById(category.id)),
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findById(id: number): Promise<any> {
    try {
      const category = await this.categoriesRepository.findOne({
        where: { id },
        relations: ['child_category'],
      });

      if (!category) return new BadRequestException('Category not found');

      category.child_category = await Promise.all(
        category.child_category.map((category) => this.findById(category.id)),
      );

      return category;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
