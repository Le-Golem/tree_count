import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { BadGatewayException, Controller, Get, Param } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get('/')
  // async get() {
  //   return await this.userService.find();
  // }

  // @Post()
  // async create(@Body() user: addUserDto): Promise<UserEntity> {
  //   return await this.userService.create(user);
  // }

  @Get(':userId')
  async getUserById(@Param('userId') userId: number): Promise<UserEntity> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new BadGatewayException('User not found');
    }
    return user;
  }

  // @Get(':userId/events')
  // async getEventsByUserId(
  //   @Param('userId') userId: number,
  // ): Promise<UserEntity> {
  //   return await this.userService.getEvents(userId);
  // }
}
