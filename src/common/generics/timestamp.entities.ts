import { BaseEntity, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class TimestampEntity extends BaseEntity {
  @CreateDateColumn({
    update: false,
    select: false
  })
  createdAt: Date;

  @UpdateDateColumn({
    select: false
  })
  updatedAt: Date;

  @DeleteDateColumn({
    select: false
  })
  deletedAt: Date;
}