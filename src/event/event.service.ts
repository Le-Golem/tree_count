import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { EventEntity } from "./entity/event.entity";
import { addEventDto } from "./dto/addEvent.dto";
import { UserEntity } from "src/user/entity/user.entity";
import { ParticipateEntity } from "src/user/entity/participate.entity";


@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventEntity)
        private readonly eventRepository: Repository<EventEntity>,
        @InjectRepository(ParticipateEntity)
        private readonly participateRepository : Repository<ParticipateEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>
    ) 
    {}

    async create (event : addEventDto) {
        const insertResult = await this.eventRepository.insert(event)  
        const newEvent = insertResult.raw[0]
        for(const userId of event.usersToParticipate){
            const user = await this.userRepository.findOne({where : {userId}}) 
            if (!user){
                //error badGateway
            }
            const newParticipate = new ParticipateEntity(newEvent,user)
            await this.participateRepository.insert(newParticipate)
        }
        return newEvent
    }

    async findEventByUser(userId: number): Promise<EventEntity[]> {
        return this.eventRepository
            .createQueryBuilder('event')
            .leftJoinAndSelect('event.users', 'participate')
            .leftJoinAndSelect('participate.user', 'user')
            .where('user.userId = :userId', { userId })
            .getMany();
    }   
    
}



