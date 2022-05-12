import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

import { Item } from '../../items/models/item.model';


@ObjectType({ description: 'menu' })
@Entity()
export class Menu {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 50, nullable: false })
  name: string;

  @Field({ nullable: true })
  @Column()
  description?: string;

  @Field()
  @Column()
  startTime: number;

  @Field()
  @Column()
  endTime: number;

  @Field( type => [Item], { nullable: true } )
  @ManyToMany( () => Item, item => item.menus, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  items: Item[];

}
