import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from './core/createServer'
import { logger } from './core/logger'

const isDev = process.env.NODE_ENV !== 'production'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

if (isDev) {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.development') })
} else {
    dotenv.config()
}

;(async () => {
    try {
        await createServer()
    } catch (err) {
        logger.error(`Unable to start server - ${err}`)
        process.exit(1)
    }
})()
