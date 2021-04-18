import { Arg, Resolver, Mutation } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { createWriteStream } from "fs";

import { Upload } from '../../types/Upload'

@Resolver()
export class ProfilePictureResolver {
  @Mutation(() => Boolean)
  async addProfilePicure(
    @Arg("picture", () => GraphQLUpload)
    { createReadStream, filename }: Upload
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../../../images/${filename}`))
        .on("finish", () => resolve(true))
        .on("error", () => reject(false))
    );
  }
}
