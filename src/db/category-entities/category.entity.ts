import {
  Column,
  Entity,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Posts } from '../post-entities/post.entity';

@Entity('categories')
@Tree('materialized-path')
export class Categories extends BaseEntity {
  @Column({ type: 'varchar', length: 20 })
  category_name: string;

  @TreeChildren()
  children: Categories[];

  @TreeParent()
  parent: Categories;

  @OneToMany(() => Posts, (post) => post.category)
  posts: Posts[];
}
