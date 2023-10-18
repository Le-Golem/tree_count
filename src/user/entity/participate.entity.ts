import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { EventEntity } from 'src/event/entity/event.entity';

@Entity('participate')
export class ParticipateEntity {
  @PrimaryGeneratedColumn()
  participateId: number;

  @ManyToOne(() => UserEntity, (user) => user.events)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => EventEntity, (event) => event.users)
  @JoinColumn({ name: 'event' })
  event: EventEntity;

  constructor(event: EventEntity, user: UserEntity) {
    this.user = user;
    this.event = event;
  }
}
