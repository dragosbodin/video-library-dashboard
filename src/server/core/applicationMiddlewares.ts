import express, { ErrorRequestHandler, Express, RequestHandler } from 'express'
import cookieParser from 'cookie-parser'
import { BASE_PATH } from '../../constants'
import { logger } from './logger'

const accessLogMiddleware: RequestHandler = (req, res, next) => {
    logger.info(
        `${req.method} ${req.protocol}://${req.hostname}${req.url} :: ${res.statusCode} - ${res.statusMessage ?? 'OK'}`
    )

    next()
}

const errorLogMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    logger.error(
        `${req.method} ${req.protocol}://${req.hostname}${req.url} :: ${res.statusCode} - ${res.statusMessage ?? ''} ${String(err)}`
    )

    next()
}

export const applicationMiddlewares = (expressApp: Express) => {
    expressApp.use(accessLogMiddleware)
    expressApp.use(errorLogMiddleware)
    expressApp.use(express.json({ limit: '10mb' }))
    expressApp.use(cookieParser())
    expressApp.use(`${BASE_PATH}`, express.static('dist'))
    expressApp.use(`${BASE_PATH}`, express.static('public'))
}
