import { TypeOrmModule } from "@nestjs/typeorm";
import { ParticipantEntity } from "./entity/participant.entity";
import { Module } from '@nestjs/common';
import { ParticipantController } from "./participant.controller";
import { ParticipantService } from "./participant.service";

@Module({
    imports : [
        TypeOrmModule.forFeature([ParticipantEntity])
    ],
    controllers : [ParticipantController],
    providers : [ParticipantService],
    exports : [ParticipantService], 
})

export class ParticipantModule {}