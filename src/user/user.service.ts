import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { addUserDto } from './dto/addUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async find() {
    return await this.userRepository.find();
  }

  async create(user: addUserDto): Promise<UserEntity> {
    const userExist = await this.userRepository.findOne({
      where: { username: user.username },
    });
    if (userExist) {
      throw new BadGatewayException('Username already exist');
    }

    const insertResult = await this.userRepository.insert(user);
    const newUser: UserEntity = insertResult.raw[0];
    return newUser;
  }

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { username: username } });
  }

  async findById(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { userId: userId },
      relations: ['participate', 'participate.event'],
    });
  }
}
