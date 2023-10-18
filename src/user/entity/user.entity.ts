import { TimestampEntity } from 'src/common/generics/timestamp.entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParticipateEntity } from './participate.entity';

@Entity('users')
export class UserEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  email: string;

  @OneToMany(() => ParticipateEntity, (event) => event.user)
  @JoinColumn({ name: 'userEvent' })
  events: ParticipateEntity[];
}
