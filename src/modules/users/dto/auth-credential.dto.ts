import { Field, InputType } from "@nestjs/graphql";
import { IsDefined, IsString, MinLength } from "class-validator";

@InputType()
export class AuthCredentialsDto {
    @IsDefined()
    @Field()
    username: string;

    @IsDefined()
    @MinLength(8)
    @Field()
    password: string;
}