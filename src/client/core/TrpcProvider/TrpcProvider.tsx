import { QueryClient } from '@tanstack/react-query'
import { TRPCClient } from '@trpc/client'
import { createTRPCContext } from '@trpc/tanstack-react-query'

import { apiRouter } from '../../../server/api'
export const TrpcContext = createTRPCContext<typeof apiRouter>()

export type TrpcProviderProps = {
    queryClient: QueryClient
    trpcClient: TRPCClient<typeof apiRouter>
    children: React.ReactNode
}

export const TrpcProvider = ({
    queryClient,
    trpcClient,
    children,
}: TrpcProviderProps) => {
    return (
        <TrpcContext.TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
            {children}
        </TrpcContext.TRPCProvider>
    )
}
