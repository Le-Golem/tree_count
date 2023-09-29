import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ParticipateEntity } from './entity/participate.entity';


@Module({
  imports: [ 
    TypeOrmModule.forFeature([UserEntity , ParticipateEntity])
],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
