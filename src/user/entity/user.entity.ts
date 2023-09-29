import { TimestampEntity } from "src/common/generics/timestamp.entities";
import { EventEntity } from "src/event/entity/event.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ParticipateEntity } from "./participate.entity";


@Entity('users')
export class UserEntity extends TimestampEntity {
    @PrimaryGeneratedColumn()
    userId: number ;
    
    @Column()
    username : string 

    @Column()
    password : string;

    @Column()
    enabled : number;

    @Column()
    authority : string;

    @Column()
    email : string;

    @Column()
    boolmdp : boolean;

    @Column()
    photo : string ;

    @OneToMany(() => ParticipateEntity , (event) => event.user)
    @JoinColumn({name : "userEvent"})
    events : ParticipateEntity[] ; 
}

