import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { BASE_PATH } from './src/constants'

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        base: BASE_PATH,
        root: '',
        resolve: {
            alias: {
                styles: path.resolve(__dirname, 'src/client/styles'),
            },
        },
        plugins: [react(), tsconfigPaths()],
        build: {
            manifest: true,
            rollupOptions: {
                input: ['./src/client/main.tsx'],
            },
            target: 'esnext',
            sourcemap: true,
        },
    }
})
