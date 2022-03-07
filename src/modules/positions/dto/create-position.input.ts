import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class CreatePositionInput {
  @Field()
  @IsDefined()
  name: string;
}
