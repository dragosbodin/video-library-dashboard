import { format, createLogger, transports } from 'winston'

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.errors({ stack: true }),
        format.colorize(),
        format.timestamp(),
        format.align(),
        format.printf((info) => {
            return `${info.timestamp} ${info.level}: ${info.message}`
        })
    ),
    defaultMeta: { service: 'user-service' },
    transports: [new transports.Console()],
})
