import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { addTransactionsDto } from './dto/addTransactions.dto';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(@Body() transactions: addTransactionsDto) {
    return await this.transactionsService.create(transactions);
  }

  @Delete(':transactionId')
  async delete(@Param('transactionId', ParseIntPipe) transactionId: number) {
    return await this.transactionsService.delete(transactionId);
  }
}
