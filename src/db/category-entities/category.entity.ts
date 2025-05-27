import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('categories')
export class Categories extends BaseEntity{

  @Column({ type: 'varchar', length: 20 })
  category_name: string;

  @Column({ nullable: true })
  parent_id: number;

  @ManyToOne(() => Categories, { eager: true })
  @JoinColumn({ name: 'parent_id' })
  parentCategory: Categories;
}
