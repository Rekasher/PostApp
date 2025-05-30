import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Categories } from '../../db/category-entities/category.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityNotFoundError, TreeRepository } from 'typeorm';

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
      return this.treeRepository.save(category);
    } catch (error) {
      throw new EntityNotFoundError('Parent category not found', error);
    }
  }

  async findAll(): Promise<Categories[]> {
    try {
      return this.treeRepository.findTrees({ relations: ['posts'] });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findById(id: number): Promise<Categories> {
    try {
      const node = await this.treeRepository.findOneOrFail({ where: { id } });

      return this.treeRepository.findDescendantsTree(node, {
        relations: ['posts'],
      });
    } catch (error) {
      throw new EntityNotFoundError('Category not found', error);
    }
  }

  async delete(id: number): Promise<any> {
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

      await this.treeRepository.delete(
        categories.map((category) => category.id).reverse(),
      );

      return {
        success: true,
        message: 'Category deleted successfully.',
      };
    } catch (error) {
      throw new NotFoundException(error, 'No exist category');
    }
  }
}
