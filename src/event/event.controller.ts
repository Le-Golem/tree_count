
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EventService } from "./event.service";
import { addEventDto } from "./dto/addEvent.dto";
import { EventEntity } from "./entity/event.entity";

@ApiTags('events')
@Controller('events')
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
    
    @Get('userId/:userId')
    async findEventByUser(
        @Param('userId', ParseIntPipe) userId: number
    ){
        return await this.eventService.findEventByUser(userId)
    }

    // @Get('user/:userId')
    // async getEventsByUserId(@Param('userId') userId: number): Promise<EventEntity[]> {
    // return this.eventService.getEventsByUserId(event,userId);
    // }

}