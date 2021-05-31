// @ts-nocheck
import winston from 'winston';

const myFormat = winston.format.printf(({ level, message, label, timestamp }) => `[${timestamp}] ${level}: ${message}`);

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(winston.format.timestamp(), winston.format.colorize({ all: true }), myFormat),
    transports: [
        new winston.transports.Console(),
        // new winston.transports.File({ filename: 'logfile.log' })
    ],
});

export default logger;
