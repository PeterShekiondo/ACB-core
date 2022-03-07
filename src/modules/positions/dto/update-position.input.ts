import { CreatePositionInput } from './create-position.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class UpdatePositionInput extends PartialType(CreatePositionInput) {
  @Field(() => Int)
  id: number;

  @Field()
  @IsDefined()
  name: string;
}
