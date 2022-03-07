import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Hash } from 'src/helper/hash-helper';
import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  full_name: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  department: string;

  @Field()
  @Column()
  position: string;

  @BeforeInsert()
  async beforeInsert() {
    this.password = await Hash.make(this.password);
  }
}
