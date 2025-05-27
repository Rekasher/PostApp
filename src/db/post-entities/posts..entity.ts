import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Categories } from '../category-entities/category.entity';
import { BaseEntity } from '../base.entity';

@Entity('posts')
export class Posts extends BaseEntity{

  @Column({ type: 'text' })
  content: string;

  @Column()
  category_id: number;

  @ManyToOne(() => Categories, { eager: true })
  @JoinColumn({ name: 'category_id' })
  parentCategory: Categories;
}
