import { Express, Router } from 'express'
import fs from 'node:fs/promises'
import { BASE_PATH } from '../../constants'
import { PageModel } from '../../types/App'
import path from 'node:path'

const manifestPath = path.join(path.resolve(), 'dist/.vite', 'manifest.json')
const isDev = process.env.NODE_ENV !== 'production'
const pageRoutes = new RegExp(`^${BASE_PATH}/(?!fonts|images|api|trpc)(.*)`)
const webRouter = Router()

webRouter.get(pageRoutes, async (_req, res) => {
    const manifestFile = isDev ? '{}' : (await fs.readFile(manifestPath)).toString()

    res.render('../index.html.ejs', {
        pageModel: {
            apiUrl: process.env.API_URL ?? '',
            applicationVersion: process.env.APPLICATION_VERSION ?? '0.1.0',
            basePath: BASE_PATH,
            environment: process.env.ENVIRONMENT ?? 'dev',
            env: process.env.NODE_ENV ?? 'development',
        } satisfies PageModel,
        manifest: JSON.parse(manifestFile),
    })
})

export const initialiseWebRouter = (app: Express) => {
    app.use(webRouter)
}
