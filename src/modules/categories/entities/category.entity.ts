import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Categories {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 20 })
  category_name: string;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  updated_at: Date;

  @Column({ nullable: true })
  parent_id: number;

  @ManyToOne(() => Categories, {eager: true})
  @JoinColumn({ name: 'parent_id' })
  categories: Categories;

}