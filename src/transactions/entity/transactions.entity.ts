import { TimestampEntity } from 'src/common/generics/timestamp.entities';
import { EventEntity } from 'src/event/entity/event.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('transactions')
export class TransactionsEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  transactionId: number;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

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

  @ManyToMany(() => UserEntity, (user) => user.transactions)
  @JoinTable({
    name: 'transaction_receivers',
    joinColumn: {
      name: 'transactionId',
      referencedColumnName: 'transactionId',
    },
    inverseJoinColumn: {
      name: 'receiverId',
      referencedColumnName: 'userId',
    },
  })
  receivers: UserEntity[];
}
