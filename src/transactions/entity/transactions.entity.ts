import { TimestampEntity } from 'src/common/generics/timestamp.entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class TransactionsEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  transactionId: number;

  @Column()
  label: string;

  @Column()
  amount: string;

  @Column()
  userId: number;
}
