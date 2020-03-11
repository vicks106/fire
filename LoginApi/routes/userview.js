const config = require('../config/configuration.js');
var moment=require('moment');
var time=moment();
var express=require('express');
var app=express();


	exports.userviewfunc = (req, res) =>{
	
    var user=req.headers.user;
    var sql = require("mssql");    

    // connect to your database
    sql.connect(config, function (err) {	
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records 
       // var sSQL = 'SELECT date,login_time,logout_time,session FROM loginData';
       var sSQL='SELECT FIRST_NAME,date,login_time,logout_time,session FROM userDetails,loginData where \'' + user +'\'=userDetails.USERR';
    
        request.query(sSQL,function(err,result,fields){

          //  console.log(sSQL);
			if(err) console.log('error',err);            

            res.send(result);
          //  console.log(result);   
			           
        });
    });
}
	

