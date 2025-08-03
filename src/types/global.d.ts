/// <reference types="vite/client" />

import { PageModel } from 'types/App'

export {}

declare global {
    interface Window {
        pageModel: PageModel
    }
}
