import videoData from './videos.json' with { type: 'json' }
import { db } from '../database'
import { logger } from '../../core/logger'

const main = async () => {
    const { videos } = videoData

    for (const video of videos) {
        try {
            await db.video.create({
                data: { ...video, tags: video.tags.join(',') },
            })
            logger.info(`Created video ${video.title}`)
        } catch (err) {
            logger.error(`Unable to create video ${video.title} - ${err}`)
        }
    }

    logger.info(`Finalised seeding videos`)
}

try {
    await main()
    await db.$disconnect()
} catch (err) {
    logger.error(`Unable to seed database - ${err}`)
    await db.$disconnect()
    process.exit(1)
}
