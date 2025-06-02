import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Categories } from '../../db/category-entities/category.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, DeleteResult, TreeRepository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  private readonly treeRepository: TreeRepository<Categories>;

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.treeRepository = this.dataSource.getTreeRepository(Categories);
  }

  async create(createDto: CreateCategoryDto): Promise<Categories> {
    try {
      const { category_name, parent_id } = createDto;
      const category = new Categories();
      category.category_name = category_name;

      if (parent_id) {
        category.parent = await this.treeRepository.findOneOrFail({
          where: { id: parent_id },
        });
      }
      return await this.treeRepository.save(category);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<Categories[]> {
    try {
      return await this.treeRepository.findTrees({ relations: ['posts'] });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findById(id: number): Promise<Categories> {
    try {
      const node = await this.treeRepository.findOneOrFail({ where: { id } });

      return await this.treeRepository.findDescendantsTree(node, {
        relations: ['posts'],
      });
    } catch (error) {
      throw new NotFoundException('Category not found', error);
    }
  }

  async delete(id: number): Promise<DeleteResult | BadRequestException> {
    try {
      const node = await this.treeRepository.findOneOrFail({
        where: { id },
      });
      const categories = await this.treeRepository.findDescendants(node, {
        relations: ['posts'],
      });

      const hasPosts = categories.some((category) => category.posts.length > 0);

      if (hasPosts) {
        return new BadRequestException(
          'Impossible to delete categories with posts',
        );
      }

      const categoriesIds = categories.map((category) => category.id).reverse();

      return await this.treeRepository.delete(categoriesIds);
    } catch (error) {
      throw new NotFoundException(error, 'No exist category');
    }
  }

  async update(id: number, data: UpdateCategoryDto): Promise<any> {
    try {
      const { category_name, parent_id } = data;

      const category = await this.treeRepository.findOneOrFail({
        where: { id },
      });

      if (category_name) {
        category.category_name = category_name;
      }

      if (parent_id) {
        const categories = await this.treeRepository.findDescendants(category);
        const isChild = categories.some(
          (category) => category.id === parent_id,
        );

        if (isChild)
          return new BadRequestException(
            'Impossible to move parent to child category',
          );

        category.parent = await this.treeRepository.findOneOrFail({
          where: { id: parent_id },
        });
      }

      category.updated_at = new Date();

      return await this.treeRepository.save(category);
    } catch (error) {
      throw new NotFoundException(error, 'No exist category');
    }
  }
}
