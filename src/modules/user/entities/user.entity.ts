import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from './role.entity';

@Entity('users')
export class Users {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true, type: 'varchar', length: 25 })
  user_name: string;

  @Column({ unique: true, type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  updated_at: Date;

  @Column()
  role_id: number;

  @OneToOne(() => Roles, {eager: true})
  @JoinColumn({ name: 'role_id' })
  roles: Roles;

}