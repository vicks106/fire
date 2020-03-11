var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var bunyan = require('bunyan');
var path = require('path')
 
var app = express()

 

 
 var log = bunyan.createLogger({name: 'express-skeleton'});
 log.info('Welcome to the app'); 
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
app.use(morgan('dev'));
//app.use(morgan('dev', { stream: accessLogStream }));
 
app.get('/', function (req, res) {
  res.send('hello, world!')
}); 
  

app.listen(3000,function(){
	console.log('server started in port 3000..');
})