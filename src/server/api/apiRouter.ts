import * as trpcExpress from '@trpc/server/adapters/express'
import { Express } from 'express'

import { createContext, createTRPCRouter } from './trpc'
import { videoRouter } from './videoRouter'

export const apiRouter = createTRPCRouter({
    video: videoRouter,
})

export const initialiseApiRouter = (app: Express) => {
    app.use(
        '/trpc',
        trpcExpress.createExpressMiddleware({
            router: apiRouter,
            createContext,
        })
    )
}
