import { TimestampEntity } from "src/common/generics/timestamp.entities";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
    photo : string 

    // ajoute le lien vers Evenement
}