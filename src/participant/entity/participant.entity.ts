import { TimestampEntity } from "src/common/generics/timestamp.entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class ParticipantEntity extends TimestampEntity {
    @PrimaryGeneratedColumn()
    participantId: number;

    @Column()
    pseudo : string 
}