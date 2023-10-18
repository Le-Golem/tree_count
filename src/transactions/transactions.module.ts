import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsEntity } from './entity/transactions.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { EventEntity } from 'src/event/entity/event.entity';
import { ParticipateEntity } from 'src/user/entity/participate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionsEntity,
      UserEntity,
      EventEntity,
      ParticipateEntity,
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
