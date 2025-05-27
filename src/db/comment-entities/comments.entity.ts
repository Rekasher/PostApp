import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Users } from '../user-entities/user.entity';
import { Posts } from '../post-entities/posts..entity';
import { BaseEntity } from '../base.entity';

@Entity('comments')
export class Comments extends BaseEntity{

  @Column({ type: 'varchar', length: 255 })
  comment: string;

  @Column()
  user_id: number;

  @ManyToOne(() => Users, { eager: true })
  @JoinColumn({ name: 'user_id' })
  creator: Users;

  @Column()
  posts_id: number;

  @ManyToOne(() => Posts, { eager: true })
  @JoinColumn({ name: 'posts_id' })
  posts: Users;
}
