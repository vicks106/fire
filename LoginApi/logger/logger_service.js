const winston = require('winston')


myFormat = () => {
    return new Date(Date.now()).toUTCString()
}
class LoggerService {
    constructor(route) {
      
       
        this.route = route
        const logger = winston.createLogger({
            transports: [
                new winston.transports.Console(),
               
                new winston.transports.File({
                    filename: `./logs/${route}.log`
                })
            ],
            format: winston.format.printf((info) => {
                let message = `${myFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message}  `
                message = info.obj ? message + `data:${JSON.stringify(info.obj)}  ` : message
                return message
            })
        });
        this.logger = logger
    }

    async info(message) {
        this.logger.log('info', message);
    }
    async debug(message) {
        this.logger.log('debug', message);
    }
    async error(message) {
        this.logger.log('error', message);
    }

}
module.exports = LoggerService