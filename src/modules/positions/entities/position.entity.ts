import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Position {
  @Field(() => Int,)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;
}
