
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserEntity } from "./entity/user.entity";
import { addUserDto } from "./dto/addUser.dto";

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) 
    {}
    
    @Get('/')
    async get(){
        return await this.userService.find()
    }

    @Post()
    async create(
        @Body() user: addUserDto)
        :Promise<UserEntity> {
        return await this.userService.create(user);
    }

    @Get(':username')
    async find(
        @Param('username' ) username : string) {
            {
                return await this.userService.findOne(username)
            } 
    }

    @Get(':userId')
    async getUserById(
        @Param('userId') userId: number): Promise<UserEntity> {
        return this.userService.getUserById(userId);
    }
}