import { TrpcContext } from 'core/TrpcProvider'

export const useTrpcContext = () => {
    const trpc = TrpcContext.useTRPC()

    if (!trpc) {
        throw new Error('useTrpcContext has to be used within <TrpcContext.Provider>')
    }

    return trpc
}
