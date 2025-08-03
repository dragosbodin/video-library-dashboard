import path from 'node:path'
import express from 'express'
import { applicationMiddlewares } from './applicationMiddlewares'
import { fileURLToPath } from 'node:url'
import { logger } from './logger'
import { initialiseApiRouter } from '../api'
import { initialiseWebRouter } from '../web'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const createServer = async () => {
    const app = express()
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, './'))

    applicationMiddlewares(app)
    initialiseWebRouter(app)
    initialiseApiRouter(app)

    const applicationServer = app.listen(8080, () => {
        logger.info('Application server started on port 8080')
    })

    return {
        applicationServer,
    }
}
