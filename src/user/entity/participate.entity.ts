import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { EventEntity } from 'src/event/entity/event.entity';

@Entity('participate')
export class ParticipateEntity {
  @PrimaryGeneratedColumn()
  participateId: number;

  @ManyToOne(() => UserEntity, (user) => user.participate)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => EventEntity, (event) => event.participate)
  @JoinColumn({ name: 'eventId' })
  event: EventEntity;

  constructor(event: EventEntity, user: UserEntity) {
    this.user = user;
    this.event = event;
  }
}
