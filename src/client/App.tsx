import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createTRPCClient, httpBatchLink, loggerLink } from '@trpc/client'
import { ConfigProvider, ThemeConfig } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { useState } from 'react'
import { Outlet } from 'react-router'
import SuperJSON from 'superjson'

import { AppProvider } from 'core/AppProvider'
import { TrpcProvider } from 'core/TrpcProvider'

import './styles/globals.scss'

import { apiRouter } from '../server/api'

import variables from './styles/variables.module.scss'

dayjs.extend(customParseFormat)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
        },
    },
})

const links = [
    loggerLink({
        enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
    }),
    httpBatchLink({
        transformer: SuperJSON,
        url: window.pageModel.basePath + '/trpc',
    }),
]

const {
    colorPrimary,
    colorInfo,
    colorInfoBg,
    colorWarning,
    textPrimary,
    textSecondary,
} = variables
const themeConfig: ThemeConfig = {
    hashed: false,
    token: {
        colorPrimary,
        colorLink: colorPrimary,
        colorWarning,
        borderRadius: 4,
        colorText: textPrimary,
        colorTextSecondary: textSecondary,
        fontFamily: "'Raleway', sans-serif",
        colorFillTertiary: colorInfo,
    },
    components: {
        Tooltip: {
            colorBgSpotlight: colorInfoBg,
            colorTextLightSolid: 'black',
        },
        Alert: {
            colorInfo: 'black',
            colorInfoBorder: colorPrimary,
            colorInfoBg: colorInfoBg,
        },
    },
}

export const App = () => {
    const [trpcClient] = useState(() =>
        createTRPCClient<typeof apiRouter>({
            links,
        })
    )

    return (
        <QueryClientProvider client={queryClient}>
            <TrpcProvider trpcClient={trpcClient} queryClient={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <ConfigProvider theme={themeConfig}>
                    <AppProvider>
                        <Outlet />
                    </AppProvider>
                </ConfigProvider>
            </TrpcProvider>
        </QueryClientProvider>
    )
}
