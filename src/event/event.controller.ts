import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { addEventDto } from './dto/addEvent.dto';
import { updateEventDto } from './dto/updateEvent.dto';

@ApiTags('events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() event: addEventDto) {
    return await this.eventService.create(event);
  }

  @Get()
  async find() {
    return await this.eventService.find();
  }

  @Patch(':eventId')
  async update(@Body() event: updateEventDto) {
    return await this.eventService.update(event);
  }

  @Post('addUserToEvent')
  async addUserToEvent(
    @Query('eventId', ParseIntPipe) eventId: number,
    @Query('userId', ParseIntPipe) userId: number,
  ) {
    return await this.eventService.addUserToEvent(eventId, userId);
  }

  @Delete('removeUserFromEvent')
  async deleteUserFromEvent(
    @Query('eventId', ParseIntPipe) eventId: number,
    @Query('userId', ParseIntPipe) userId: number,
  ) {
    return await this.eventService.removeUserFromEvent(eventId, userId);
  }

  // @Get('userId/:userId')
  // async findEventByUser(@Param('userId', ParseIntPipe) userId: number) {
  //   return await this.eventService.findEventByUser(userId);
  // }

  // @Get('user/:userId')
  // async getEventsByUserId(@Param('userId') userId: number): Promise<EventEntity[]> {
  // return this.eventService.getEventsByUserId(event,userId);
  // }
}
