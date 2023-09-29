
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EventService } from "./event.service";
import { addEventDto } from "./dto/addEvent.dto";
import { EventEntity } from "./entity/event.entity";

@ApiTags('event')
@Controller('event')
export class EventController {
    constructor(
        private readonly eventService: EventService,
    ) 
    {}

    @Post()
    async create(
        @Body() event : addEventDto){
            return await this.eventService.create(event)
    }
    
    @Get()
    async get(){
        return await this.eventService.find()
    }

    @Get(":userId")
    async getByUserId(
        @Param('userId' , ParseIntPipe) userId : number
    ) : Promise<EventEntity >{
        return await this.eventService.findEventByUserId(userId)
    }

}