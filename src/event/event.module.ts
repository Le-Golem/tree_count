import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entity/event.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { UserEntity } from 'src/user/entity/user.entity';
import { ParticipateEntity } from 'src/user/entity/participate.entity';
import { TransactionsEntity } from 'src/transactions/entity/transactions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventEntity,
      ParticipateEntity,
      UserEntity,
      TransactionsEntity,
    ]),
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
