import { MiddlewareFn } from "type-graphql"

import { MyContext } from '../../types/MyContext'

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
    if (!context.req.session!.userId) {
        throw new Error('Sorry, that user is not authenticated')
    }
    return next();
  };