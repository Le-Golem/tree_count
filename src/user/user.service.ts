import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { UserEntity } from "./entity/user.entity";
import { addUserDto } from "./dto/addUser.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

    ) {
    }
   
    async find() {
        return await this.userRepository.find()
    }

    async create (user : addUserDto) {
        return await this.userRepository.save(user)   
    }

    async findOne(username: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({ where: { username: username } });
      }

    async getUserById(userId: number): Promise<UserEntity> {
        return await this.userRepository.findOne({where : {userId : userId}});
    }

    async getEvents(userId : number) : Promise<UserEntity> {
        return this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.events' , 'participate')
        .leftJoinAndSelect('participate.event' , 'event')
        .where('user.userId = :userId' , {userId})
        .getOne()
    }
}