import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  // @Get()
  // async get() {
  //   return await this.transactionsService.find();
  // }

  // @Post()
  // async create(@Body() transactions: addTransactionsDto) {
  //   return await this.transactionsService.create(transactions);
  // }

  // @Get(':userId')
  // async getTransactionByUserId(
  //   @Param('userId') userId: number,
  // ): Promise<TransactionsEntity> {
  //   return this.transactionsService.getTransactionByUserId(userId);
  // }
}
