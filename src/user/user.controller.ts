import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { BadGatewayException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { addUserDto } from './dto/addUser.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async get() {
    return await this.userService.find();
  }

  @Post()
  async create(@Body() user: addUserDto): Promise<UserEntity> {
    return await this.userService.create(user);
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: number): Promise<UserEntity> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new BadGatewayException('User not found');
    }
    return user;
  }
}
