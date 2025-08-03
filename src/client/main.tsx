import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'

import '@ant-design/v5-patch-for-react-19'

import { router } from './router'
;(() => {
    try {
        ReactDOM.createRoot(document.getElementById('root')!).render(
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>
        )
    } catch (err) {
        console.error(err)
    }
})()
