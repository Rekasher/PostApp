import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from '../../categories/entities/category.entity';

@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  updated_at: Date;

  @Column()
  category_id: number;

  @ManyToOne(() => Categories, { eager: true })
  @JoinColumn({ name: 'category_id' })
  categories: Categories;
}
