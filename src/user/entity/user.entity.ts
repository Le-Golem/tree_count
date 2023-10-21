import { TimestampEntity } from 'src/common/generics/timestamp.entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParticipateEntity } from './participate.entity';
import { TransactionsEntity } from 'src/transactions/entity/transactions.entity';
//import bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({
    nullable: true,
    select: false,
  })
  email: string;

  @OneToMany(() => ParticipateEntity, (event) => event.user)
  @JoinColumn({ name: 'participateId' })
  participate: ParticipateEntity[];

  @OneToMany(() => TransactionsEntity, (transaction) => transaction.sender)
  @JoinColumn({ name: 'transactionId' })
  transactions: TransactionsEntity[];

  // async validatePassword(password: string): Promise<boolean> {
  //   return await bcrypt.compare(password, this.password);
  // }
}
