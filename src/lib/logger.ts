import { randomUUID } from 'crypto';
import path from 'path';
import winston from 'winston';
import 'winston-daily-rotate-file';

const streamingLogPath = path.join(process.cwd(), 'logs', 'app-stream.log');
const rotatingLogPath = path.join(process.cwd(), 'logs', 'app-%DATE%.log');

const customFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      ({ timestamp, level, message, ip, tag }) =>
        `${timestamp} [${level.toUpperCase()}] [${ip}] [${tag || 'general'}]: ${message}`

    )
  );

const logger = winston.createLogger({
    level: 'info',
    format: customFormat,
    transports: [
        // Continuous streaming log
        new winston.transports.File({
        filename: streamingLogPath,
        level: 'info', // Log level
        }),

        // Date-based rotating log
        new winston.transports.DailyRotateFile({
        filename: rotatingLogPath,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true, // Compress rotated logs
        maxSize: '20m', // Max size of a single log file
        maxFiles: '14d', // Retain logs for 14 days
        }),
    ],
});

export const taggedLogger = (tag: string) => {
    return {
        info: (message: string) => logger.info(message, { tag }),
        warn: (message: string) => logger.warn(message, { tag }),
        error: (message: string) => logger.error(message, { tag }),
        debug: (message: string) => logger.debug(message, { tag }),
    };
};

export default logger;
  