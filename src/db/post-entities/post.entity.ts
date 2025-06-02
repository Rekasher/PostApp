import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Categories } from '../category-entities/category.entity';
import { BaseEntity } from '../base.entity';
import { Users } from '../user-entities/user.entity';

@Entity('posts')
export class Posts extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Categories, (category) => category.id, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ManyToOne(() => Users, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
