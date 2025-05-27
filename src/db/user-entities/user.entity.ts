import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Roles } from '../role-entities/role.entity';
import { BaseEntity } from '../base.entity';

@Entity('users')
export class Users extends BaseEntity{


  @Column({ unique: true, type: 'varchar', length: 25 })
  user_name: string;

  @Column({ unique: true, type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ default: 111 })
  role_id: number;

  @ManyToOne(() => Roles, { eager: true })
  @JoinColumn({ name: 'role_id' })
  roles: Roles;
}
