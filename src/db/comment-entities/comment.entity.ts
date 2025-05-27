import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Users } from '../user-entities/user.entity';
import { Posts } from '../post-entities/post.entity';
import { BaseEntity } from '../base.entity';

@Entity('comments')
export class Comments extends BaseEntity{

  @Column({ type: 'varchar', length: 255 })
  comment: string;

  @ManyToOne(() => Users, { nullable: false })
  @JoinColumn({ name: 'user_id'})
  creator: Users;

  @ManyToOne(() => Posts, { nullable: false })
  @JoinColumn({ name: 'posts_id' })
  post: Posts;
}
