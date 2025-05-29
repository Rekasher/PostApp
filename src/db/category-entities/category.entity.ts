import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('categories')
export class Categories extends BaseEntity {
  @Column({ type: 'varchar', length: 20 })
  category_name: string;

  @ManyToOne(() => Categories, (category) => category.child_category, {
    nullable: true,
  })
  parent_category: Categories;

  @OneToMany(() => Categories, (category) => category.parent_category, {
    nullable: true,
  })
  child_category: Categories[];
}
