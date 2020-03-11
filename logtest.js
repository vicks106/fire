var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'express-skeleton'});
log.info('Welcome to the app'); 
log.warn({port: 3000}, 'port'); 