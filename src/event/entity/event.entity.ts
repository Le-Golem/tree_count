import { TimestampEntity } from 'src/common/generics/timestamp.entities';
import { ParticipateEntity } from 'src/user/entity/participate.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('event')
export class EventEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  eventId: number;

  @Column()
  label: string;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => ParticipateEntity, (user) => user.event, {
    nullable: true,
  })
  @JoinColumn({ name: 'eventUser' })
  users: ParticipateEntity[];
}
