import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('categories')
export class Categories extends BaseEntity {
  @Column({ type: 'varchar', length: 20 })
  category_name: string;

  @ManyToOne(() => Categories, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent_category: Categories;
}
