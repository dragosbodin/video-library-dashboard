import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'prisma/config'

const isDev = process.env.NODE_ENV !== 'production'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

if (isDev) {
    dotenv.config({ path: path.resolve(__dirname, './.env.development') })
} else {
    dotenv.config()
}

export default defineConfig({
    schema: path.join('src/server/database', 'schema.prisma'),
    migrations: {
        seed: 'node --loader ts-node/esm --import=extensionless/register src/server/database/seeders/seed.ts',
    },
})
