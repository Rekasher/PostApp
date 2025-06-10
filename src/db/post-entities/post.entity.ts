import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Categories } from '../category-entities/category.entity';
import { BaseEntity } from '../base.entity';
import { Users } from '../user-entities/user.entity';
import { Comments } from '../comment-entities/comment.entity';

@Entity('posts')
export class Posts extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  theme: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Categories, (category) => category.id, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ManyToOne(() => Users, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToMany(() => Comments, (comment) => comment.post)
  @JoinColumn({ name: 'comment_id' })
  comments: Comments[];
}
