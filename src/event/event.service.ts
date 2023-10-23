import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './entity/event.entity';
import { addEventDto } from './dto/addEvent.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { ParticipateEntity } from 'src/user/entity/participate.entity';
import { updateEventDto } from './dto/updateEvent.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(ParticipateEntity)
    private readonly participateRepository: Repository<ParticipateEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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

    const expensesDetails: object = {};

    for (const transaction of event.transactions) {
      if (transaction.sender.userId in expensesDetails) {
        expensesDetails[transaction.sender.userId] += transaction.amount;
      } else {
        expensesDetails[transaction.sender.userId] = transaction.amount;
      }
    }

    return { event, totalExpenses, expensesDetails };
  }
}
