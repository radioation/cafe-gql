import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";
import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { NumericTransformer } from "../../numeric.transformer";

@ObjectType({ description: "item" })
@Entity()
export class Item {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ length: 50, nullable: false })
  name: string;

  @Field({ nullable: true })
  @Column()
  description?: string;

  @Field()
  @Column({
    name: "price",
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new NumericTransformer(),
  })
  price: string;
}
