import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ParticipantService } from "./participant.service";

@ApiTags('participant')
@Controller('participant')
export class ParticipantController {
    constructor(
        private readonly participantService : ParticipantService,
    )
    {}

    
}