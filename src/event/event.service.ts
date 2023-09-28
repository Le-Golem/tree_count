import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { EventEntity } from "./entity/event.entity";
import { addEventDto } from "./dto/addEvent.dto";


@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventEntity)
        private readonly eventRepository: Repository<EventEntity>,

    ) 
    {}
   
    async find() {
        return await this.eventRepository.find()
    }

    async create (event : addEventDto) {
        return await this.eventRepository.save(event)   
    }
}