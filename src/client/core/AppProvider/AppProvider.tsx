import { useQuery } from '@tanstack/react-query'
import { notification } from 'antd'
import { createContext } from 'react'

import { User } from 'types/App'

export interface AppContextValue {
    notify: ReturnType<typeof notification.useNotification>[0]
    user: User | undefined
    userLoading: boolean
    userError: boolean
}

export const AppContext = createContext<AppContextValue | null>(null)

export type AppProviderProps = {
    children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const [notify, notifyContext] = notification.useNotification()

    const {
        data: userData,
        isLoading: userLoading,
        isError: userError,
    } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            // Simulate login
            await new Promise((resolve) => setTimeout(resolve, 1000))

            return {
                id: 1,
                name: 'Dragos Bodin',
                email: 'bodin.dragos@gmail.com',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                emailVerifiedAt: null,
                twoFactorConfirmedAt: null,
                profilePhotoUrl: '',
            } satisfies User
        },
        retry: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })

    return (
        <AppContext.Provider
            value={{
                notify,
                user: userData,
                userLoading,
                userError,
            }}
        >
            {notifyContext}
            {children}
        </AppContext.Provider>
    )
}
