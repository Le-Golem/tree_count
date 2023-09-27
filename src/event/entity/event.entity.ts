import { TimestampEntity } from "src/common/generics/timestamp.entities";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('event')
export class EventEntity extends TimestampEntity {
    @PrimaryGeneratedColumn()
    eventId: number;
    
    @Column()
    Label : string;

    @OneToMany(
        () => UserEntity, (user) => user.userId
    )
    users : number[]

    @Column()
    solde : number

    @Column({ nullable: true })
    isActive : boolean

}