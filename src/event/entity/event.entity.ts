import { TimestampEntity } from 'src/common/generics/timestamp.entities';
import { TransactionsEntity } from 'src/transactions/entity/transactions.entity';
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

  @Column({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Column()
  label: string;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => ParticipateEntity, (user) => user.event, {
    nullable: true,
  })
  @JoinColumn({ name: 'participateId' })
  participate: ParticipateEntity[];

  @OneToMany(() => TransactionsEntity, (transaction) => transaction.event, {
    nullable: true,
  })
  @JoinColumn({ name: 'transactionId' })
  transactions: TransactionsEntity[];
}
