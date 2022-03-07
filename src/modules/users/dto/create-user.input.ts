import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength, IsDefined } from 'class-validator'

@InputType()
export class CreateUserInput {
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
