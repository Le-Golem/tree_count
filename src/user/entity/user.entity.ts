import { TimestampEntity } from "src/common/generics/timestamp.entities";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('user')
export class UserEntity extends TimestampEntity {
    @PrimaryGeneratedColumn()
    userId: number;
    
    @Column()
    nom : string;

    @Column()
    prenom : string;

    @Column()
    username : string

    @Column()
    motdepasse : string;

    @Column('integer', { array: true })
    follower: number[];

    @Column()
    isactive : boolean;

}