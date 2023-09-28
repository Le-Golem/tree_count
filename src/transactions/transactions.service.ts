import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { TransactionsEntity } from "./entity/transactions.entity";
import { addTransactionsDto } from "./dto/addTransactions.dto";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(TransactionsEntity)
        private readonly transactionRepository : Repository<TransactionsEntity>
    )
    {}

    async find() {
        return await this.transactionRepository.find()
    }

    async create(transactions : addTransactionsDto) {
        return await this.transactionRepository.insert(transactions)
    }

}