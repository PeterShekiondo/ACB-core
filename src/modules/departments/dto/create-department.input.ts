import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsDefined()
  name: string;
}
