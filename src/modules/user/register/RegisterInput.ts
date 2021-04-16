import { Length, IsEmail } from "class-validator";
import { PasswordMixin } from "../../shared/PasswordInput";
import { Field, InputType } from "type-graphql";
import { doesEmailAlreadyExist } from "./doesEmailAlreadyExist";
import { OkMixin } from "../../shared/OkMixin"

@InputType()
export class RegisterInput extends OkMixin(PasswordMixin(class{})) {
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
