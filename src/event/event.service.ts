import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './entity/event.entity';
import { addEventDto } from './dto/addEvent.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { ParticipateEntity } from 'src/user/entity/participate.entity';
import { updateEventDto } from './dto/updateEvent.dto';
import { TransactionsEntity } from 'src/transactions/entity/transactions.entity';

export class UserDetail {
  userId: number;
  username: string;
  email: string;
  totalContribution: number;
  totalDue: number;
  balance: number;

  constructor(partial: Partial<UserDetail>) {
    Object.assign(this, partial);
  }
}

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(ParticipateEntity)
    private readonly participateRepository: Repository<ParticipateEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TransactionsEntity)
    private readonly transactionRepository: Repository<TransactionsEntity>,
  ) {}

  async create(event: addEventDto) {
    const insertResult = await this.eventRepository.insert(event);
    const newEvent = insertResult.raw[0];

    if (event.usersToParticipate) {
      for (const userId of event.usersToParticipate) {
        const user = await this.userRepository.findOne({ where: { userId } });
        if (!user) {
          return new BadGatewayException('User not found');
        }
        const newParticipate = new ParticipateEntity(newEvent, user);
        await this.participateRepository.insert(newParticipate);
      }
    }
    return newEvent;
  }

  async find(): Promise<EventEntity[]> {
    return await this.eventRepository.find({
      relations: ['participate', 'participate.user'],
    });
  }

  async update(event: updateEventDto) {
    const eventFound = await this.eventRepository.findOne({
      where: { eventId: event.eventId },
      relations: ['participate', 'participate.user'],
    });

    if (!eventFound) {
      throw new BadGatewayException('Event not found');
    }

    return await this.eventRepository.update(event.eventId, event);
  }

  async addUserToEvent(eventId: number, userId: number) {
    const event = await this.eventRepository.findOne({
      where: { eventId },
      relations: ['participate', 'participate.user'],
    });

    if (!event) {
      throw new BadGatewayException('Event not found');
    }

    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new BadGatewayException('User not found');
    }

    if (
      event.participate.find(
        (participate) => participate.user.userId === userId,
      )
    ) {
      throw new BadGatewayException('User already in event');
    }

    const newParticipate = new ParticipateEntity(event, user);
    await this.participateRepository.insert(newParticipate);

    return await this.eventRepository.findOne({
      where: { eventId },
      relations: ['participate', 'participate.user'],
    });
  }

  async removeUserFromEvent(eventId: number, userId: number) {
    const event = await this.eventRepository.findOne({
      where: { eventId },
      relations: ['participate', 'participate.user'],
    });

    if (!event) {
      throw new BadGatewayException('Event not found');
    }

    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new BadGatewayException('User not found');
    }

    if (
      !event.participate.find(
        (participate) => participate.user.userId === userId,
      )
    ) {
      throw new BadGatewayException('User not in event');
    }

    await this.participateRepository.delete({
      event: { eventId },
      user: { userId },
    });

    return await this.eventRepository.findOne({
      where: { eventId },
      relations: ['participate', 'participate.user'],
    });
  }

  async delete(eventId: number) {
    const event = await this.eventRepository.findOne({
      where: { eventId },
      relations: ['participate', 'participate.user'],
    });

    if (!event) {
      throw new BadGatewayException('Event not found');
    }

    for (const participate of event.participate) {
      await this.participateRepository.delete(participate.participateId);
    }

    await this.eventRepository.delete({ eventId });
  }

  async getEventById(eventId: number) {
    const event = await this.eventRepository.findOne({
      where: { eventId },
      relations: [
        'participate',
        'participate.user',
        'transactions',
        'transactions.sender',
        'transactions.receivers',
      ],
    });

    if (!event) {
      throw new BadGatewayException('Event not found');
    }

    const totalExpenses = event.transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

    const participate: UserDetail[] = [];

    for (const user of event.participate) {
      const totalContribution = event.transactions.reduce(
        (acc, transaction) =>
          transaction.sender.userId === user.user.userId
            ? acc + transaction.amount
            : acc,
        0,
      );

      const totalDue = event.transactions.reduce((acc, transaction) => {
        if (transaction.receivers) {
          const receiver = transaction.receivers.find(
            (receiver) => receiver.userId === user.user.userId,
          );
          if (receiver) {
            return acc + transaction.amount / transaction.receivers.length;
          }
        }
        return acc;
      }, 0);

      const balance = totalContribution - totalDue;

      const newUserDetail = new UserDetail({
        userId: user.user.userId,
        username: user.user.username,
        email: user.user.email,
        totalContribution,
        totalDue,
        balance,
      });

      participate.push(newUserDetail);
    }

    delete event.participate;

    return { event, totalExpenses, participate };
  }

  async computeUserBalance(userId: number, eventId: number) {
    const totalContribution = await this.transactionRepository
      .createQueryBuilder('transactions')
      .leftJoin('transactions.sender', 'sender')
      .select('SUM(transactions.amount)', 'total')
      .where('sender.userId = :userId', { userId })
      .andWhere('transactions.eventId = :eventId', { eventId })
      .getRawOne();

    // Récupérez les transactions où l'utilisateur est un receiver
    const transactionsWhereReceiver = await this.transactionRepository
      .createQueryBuilder('transaction')
      .innerJoinAndSelect('transaction.receivers', 'receiver')
      .where('receiver.userId = :userId', { userId })
      .andWhere('transaction.eventId = :eventId', { eventId })
      .getMany();

    //console.log('transactionsWhereReceiver', transactionsWhereReceiver);

    let totalDue = 0;

    for (const trans of transactionsWhereReceiver) {
      const transaction = await this.transactionRepository.findOne({
        where: { transactionId: trans.transactionId },
        relations: ['receivers'],
      });
      totalDue += trans.amount / transaction.receivers.length;
    }
    // Calculez la balance
    const balance = (totalContribution.total || 0) - totalDue;

    return parseFloat(balance.toFixed(2));
  }
}
