import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'menu' })
@Entity()
export class Menu {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 50, nullable: false })
  Name: string;

  @Field({ nullable: true })
  @Column()
  description?: string;

  @Field()
  @Column()
  startTime: number;

  @Field()
  @Column()
  endTime: number;

}
