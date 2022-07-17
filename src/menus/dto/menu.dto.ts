import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class MenuDto {
  @Field()
  @MaxLength(50)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @Field()
  startTime: number;

  @Field()
  endTime: number;


  @Field( type => [String], { nullable: true } )
  @IsOptional()
  itemIds: string[];

}
