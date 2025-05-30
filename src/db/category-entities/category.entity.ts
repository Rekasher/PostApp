import {
  Column,
  Entity,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('categories')
@Tree('materialized-path')
export class Categories extends BaseEntity {
  @Column({ type: 'varchar', length: 20 })
  category_name: string;

  @TreeChildren()
  children: Categories[];

  @TreeParent()
  parent: Categories;
}
