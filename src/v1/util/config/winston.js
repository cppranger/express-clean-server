require('dotenv').config()
const winston = require('winston')

const getDate = () => {
    return new Date().toISOString()
}

const WORKING_DIR = process.env.WORKING_DIR

const filename = `${WORKING_DIR}/logs/${getDate()}.log`
console.log(filename)

const options = {
    file: {
        level: 'info',
        filename: `${WORKING_DIR}/logs/${getDate()}.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true,
    },
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
})

logger.stream = {
    write: (message, encoding) => {
        logger.info(message);
    },
}

module.exports = logger
