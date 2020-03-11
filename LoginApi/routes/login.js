const config = require('../config/configuration.js');
var logintt=require('../routes/logintime.js');
const Logger = require('../logger/logger_service.js')

var moment=require('moment');
var time=moment();
var express=require('express');
var app=express();
const logger = new Logger('Login')
var morgan = require('morgan')



	exports.loginfunc = (req, res) =>{
		const body = req.body
		let error = {}	
	
		logger.info("Request recieved at /login", req.body)
	//console.log("userss : " + req.headers.user);
	var user=req.headers.user;
	//console.log("pass : " + req.headers.pass);
	var pass=req.headers.pass;
   
    var sql = require("mssql");    

    // connect to your database
    sql.connect(config, function (err) {	
		
		var tim=logintt.logtime();
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records 
        var sSQL = 'SELECT * FROM login where USERNAME=\'' + user + '\' and PASSWORD=\'' + pass +'\'';
        request.query(sSQL,function(err,result,fields){

           // console.log(sSQL);
			if(err) console.log('error',err);            
    
			//console.log(result.rowsAffected);
   
			var aa=result.rowsAffected;
		
			

			if(aa==0) {
				logger.error("Retun error response");
				res.send('invalid credentials');
			}else{
				logger.info("Retun sucess response");
				res.send('sucess');
			//res.send(result);
			}
			           
        });
    });
}
	

