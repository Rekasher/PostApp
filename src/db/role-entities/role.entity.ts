import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Roles{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 10, unique: true })
  role_name: string;
}
