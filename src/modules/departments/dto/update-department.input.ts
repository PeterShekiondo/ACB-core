import { CreateDepartmentInput } from './create-department.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @Field(() => Int)
  id: number;
  
  @Field()
  @IsDefined()
  name: string;
}
