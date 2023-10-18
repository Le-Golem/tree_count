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
      relations: ['users', 'users.user'],
    });
  }

  async update(event: updateEventDto) {
    const eventFound = await this.eventRepository.findOne({
      where: { eventId: event.eventId },
      relations: ['users', 'users.user'],
    });

    if (!eventFound) {
      throw new BadGatewayException('Event not found');
    }

    return await this.eventRepository.update(event.eventId, event);
  }

  async addUserToEvent(eventId: number, userId: number) {
    const event = await this.eventRepository.findOne({
      where: { eventId },
      relations: ['users', 'users.user'],
    });

    if (!event) {
      throw new BadGatewayException('Event not found');
    }

    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new BadGatewayException('User not found');
    }

    const newParticipate = new ParticipateEntity(event, user);
    await this.participateRepository.insert(newParticipate);

    return await this.eventRepository.findOne({
      where: { eventId },
      relations: ['users', 'users.user'],
    });
  }

  async removeUserFromEvent(eventId: number, userId: number) {
    const event = await this.eventRepository.findOne({
      where: { eventId },
      relations: ['users', 'users.user'],
    });

    if (!event) {
      throw new BadGatewayException('Event not found');
    }

    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new BadGatewayException('User not found');
    }

    await this.participateRepository.delete({
      event: { eventId },
      user: { userId },
    });

    return await this.eventRepository.findOne({
      where: { eventId },
      relations: ['users', 'users.user'],
    });
  }

  // async findEventByUser(userId: number): Promise<EventEntity[]> {
  //   return this.eventRepository
  //     .createQueryBuilder('event')
  //     .leftJoinAndSelect('event.users', 'participate')
  //     .leftJoinAndSelect('participate.user', 'user')
  //     .where('user.userId = :userId', { userId })
  //     .getMany();
  // }
}
