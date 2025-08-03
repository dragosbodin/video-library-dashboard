import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import SuperJSON from 'superjson'
import { ZodError } from 'zod'

import { db } from '../database'

export const createContext = (_ctx: trpcExpress.CreateExpressContextOptions) => ({ db })

type Context = Awaited<ReturnType<typeof createContext>>

const trpcRoot = initTRPC.context<Context>().create({
    transformer: SuperJSON,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        }
    },
})

export const createTRPCRouter = trpcRoot.router

export const publicProcedure = trpcRoot.procedure
