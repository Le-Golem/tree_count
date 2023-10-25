import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TransactionsEntity } from './entity/transactions.entity';
import { addTransactionsDto } from './dto/addTransactions.dto';
import { EventEntity } from 'src/event/entity/event.entity';
import { ParticipateEntity } from 'src/user/entity/participate.entity';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsEntity)
    private readonly transactionRepository: Repository<TransactionsEntity>,
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(ParticipateEntity)
    private readonly participateRepository: Repository<ParticipateEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(transactions: addTransactionsDto) {
    const event = await this.eventRepository.findOne({
      where: { eventId: transactions.eventId },
      relations: ['participate', 'participate.user'],
    });

    if (!event) {
      return 'Event not found';
    }

    const sender = await this.userRepository.findOne({
      where: { userId: transactions.senderId },
    });

    if (!sender) {
      return 'User {sender} not found';
    }

    if (!event.participate.find((p) => p.user.userId === sender.userId)) {
      return 'User {sender} not participate in this event';
    }

    if (transactions.receiverId) {
      const receivers: UserEntity[] = await this.userRepository.find({
        where: { userId: In(transactions.receiverId) },
      });

      if (!receivers) {
        return 'User {receiver} not found';
      }

      for (const r of receivers) {
        if (!event.participate.find((p) => p.user.userId === r.userId)) {
          return 'User {receiver} not participate in this event';
        }

        if (sender.userId === r.userId) {
          return 'Sender and receiver cannot be the same';
        }
      }
    }

    const newTransaction = this.transactionRepository.create({
      ...transactions,
      sender,
      event,
    });

    if (transactions.receiverId) {
      const receivers: UserEntity[] = await this.userRepository.find({
        where: { userId: In(transactions.receiverId) },
      });

      newTransaction.receivers = receivers;
    }

    return await this.transactionRepository.save(newTransaction);
  }

  async delete(transactionId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { transactionId },
    });

    if (!transaction) {
      return 'Transaction not found';
    }

    return await this.transactionRepository.delete({ transactionId });
  }
}
