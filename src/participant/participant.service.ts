import { InjectRepository } from "@nestjs/typeorm";
import { ParticipantEntity } from "./entity/participant.entity";
import { Repository } from 'typeorm';
import { Injectable } from "@nestjs/common";

@Injectable()
export class ParticipantService {
    constructor(
        @InjectRepository(ParticipantEntity)
        private readonly participantRepository  : Repository<ParticipantEntity>
    )
    {}
    
}