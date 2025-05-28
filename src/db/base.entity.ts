import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity as TypeOrmEntity,
} from 'typeorm';

@Entity()
export abstract class BaseEntity extends TypeOrmEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  updated_at: Date;
}
