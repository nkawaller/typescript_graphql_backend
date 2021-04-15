import { Resolver, Mutation, Arg } from "type-graphql";
import { v4 } from 'uuid'
import { sendEmail } from '../utils/sendEmail'
import { User } from '../../entity/User'
import { redis } from '../../redis'
import { forgotPasswordPrefix } from '../constants/redisPrefixes'

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
      const user = User.findOne({where:{email}});

      if (!user) {
          return true;
      }

    const token = v4();
    await redis.set(forgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 24); // Expires in one day

    await sendEmail(email, `http://localhost:3000/user/change-password/${token}`);

    return true;
  }
}