import { TimestampEntity } from 'src/common/generics/timestamp.entities';
import { EventEntity } from 'src/event/entity/event.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('transactions')
export class TransactionsEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  transactionId: number;

  @Column()
  label: string;

  @Column()
  amount: number;

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  @JoinColumn({ name: 'sender-userId' })
  sender: UserEntity;

  @ManyToOne(() => EventEntity, (event) => event.transactions)
  @JoinColumn({ name: 'eventId' })
  event: EventEntity;

  @ManyToOne(() => UserEntity, (user) => user.transactions, { nullable: true })
  @JoinColumn({ name: 'receiver-userId' })
  receiver: UserEntity;
}
