import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from './trpc'

export const videoRouter = createTRPCRouter({
    index: publicProcedure
        .input(
            z.object({
                sortBy: z
                    .union([z.literal('created_at-asc'), z.literal('created_at-desc')])
                    .optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            // simulate a slow db call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const [sortByKey, sortByOrder] = input.sortBy?.split('-') ?? [
                'created_at-desc',
                'desc',
            ]

            return ctx.db.video.findMany({ orderBy: { [sortByKey]: sortByOrder } })
        }),
    create: publicProcedure
        .input(
            z.object({
                title: z.string().min(1),
                thumbnail_url: z.string().url(),
                duration: z.number().nonnegative(),
                tags: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            // simulate a slow db call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            return ctx.db.video.create({
                data: {
                    id: `v-${Date.now()}`,
                    title: input.title,
                    thumbnail_url: input.thumbnail_url,
                    duration: input.duration,
                    tags: input.tags ?? '',
                },
            })
        }),
})
