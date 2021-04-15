import { Length, IsEmail } from "class-validator";
import { PasswordInput } from "../../shared/PasswordInput";
import { Field, InputType } from "type-graphql";
import { doesEmailAlreadyExist } from "./doesEmailAlreadyExist";

@InputType()
export class RegisterInput extends PasswordInput{
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @doesEmailAlreadyExist({message: "that email is already used"})
  email: string;

}
