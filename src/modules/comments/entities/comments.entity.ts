import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../../user/entities/user.entity';
import { Posts } from '../../posts/entities/posts..entity';

@Entity('comments')
export class Comments {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  comment: string;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  updated_at: Date;

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
