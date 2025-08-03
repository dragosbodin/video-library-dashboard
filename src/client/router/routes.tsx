import { Navigate, RouteObject } from 'react-router'

import { CreateVideoPage } from 'pages/CreateVideoPage'
import { VideosPage } from 'pages/VideosPage'
import { Layout } from 'ui/Layout'
import { NavigationBar } from 'ui/NavigationBar'

import { App } from '../App'

export const paths = {
    homepage: '/',
    videos: '/videos',
    addVideo: '/videos/add',
    // video: '/videos/:videoId',
    // editVideo: '/videos/:videoId/edit',
}

export const routes: RouteObject[] = [
    {
        path: '*',
        element: <Navigate to={paths.videos} replace />,
    },
    {
        element: <App />,
        children: [
            {
                element: <Layout navigationBar={<NavigationBar />} />,
                children: [
                    {
                        path: paths.videos,
                        element: <VideosPage />,
                    },
                    {
                        path: paths.addVideo,
                        element: <CreateVideoPage />,
                    },
                ],
            },
        ],
    },
]
