import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsDefined, MinLength, IsEmail } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;
  
  @Field()
  @IsDefined()
  full_name: string;

  @Field()
  @IsDefined()
  username: string;

  @Field()
  @IsDefined()
  @MinLength(8)
  password: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsDefined()
  department: string;

  @Field()
  @IsDefined()
  position: string;
}
