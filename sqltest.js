var express = require('express');
 var _ =require('underscore');
var app = express();
var moment=require('moment');
var time=moment();
var logintime,logouttime,session,ip,date;

// config for your database
var config = {
    user: 'sa',
    password: 'pass123',
    server: 'localhost', 
    database: 'testdb' 
};

app.get('/login', function (req, res) {

    //getting login time
    logintime=time.format('h:mm a');

	console.log("userss : " + req.headers.user);
	var user=req.headers.user;
	console.log("pass : " + req.headers.pass);
	var pass=req.headers.pass;
   
    var sql = require("mssql");    

    // connect to your database
    sql.connect(config, function (err) {	
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
 
        var sSQL = 'SELECT * FROM login where username=\'' + user + '\' and password=\'' + pass +'\'';
        request.query(sSQL,function(err,result,fields){
            console.log(sSQL);
		if(err) console.log('error',err);
            
        
       // console.log(result);
       // console.log(Object.keys(result).length);
    console.log(result.rowsAffected);
   
    var aa=result.rowsAffected;
    console.log("RRRR : "+aa);

      if(aa==0) {
        res.send('invalid credentials');
    }else{
        res.send("sucess");
      }
			           
        });
    });
});

app.get('/register', function (req, res) {
	console.log("userss : " + req.headers.user);
	var user=req.headers.user;
	console.log("pass : " + req.headers.pass);
	var pass=req.headers.pass;
   
    var sql = require("mssql");


    // connect to your database
    sql.connect(config, function (err) {
	
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
 
		
        var sSQL = 'INSERT INTO login values (\'' + user + '\',\'' + pass +'\')';
        request.query(sSQL,function(err,result,fields){
        console.log(sSQL);
		if(err) console.log('error',err);
            
         console.log("sucess");
         //res.send(result);

         var aa=result.rowsAffected;
    if(aa==0){
        res.send('invalid credentials');
    }else{
        res.send("sucess");
      }
			           
        });
    });
});


//logout
app.get('/logout',function(res,req){

    var today=new Date();
    var sql = require("mssql");
    var date=today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
    logouttime=time.format('h:mm a');
    var m1=moment().subtract(logintime, 'h');
    session=m1.fromNow();
    ip="ip";
    var uname="user";
   //req.headers.user;

    // connect to your database
    sql.connect(config, function (err) {	
    
        if (err) console.log(err);
        var request = new sql.Request();		
        var sSQL = 'INSERT INTO loginData(date,login_time,logout_time,session,ip,username) values (\'' + date + '\',\'' +logintime +'\',\'' +logouttime +'\',\'' +session +'\',\'' +ip +'\',\'' +uname +'\')';
        request.query(sSQL,function(err,result,fields){
        console.log(sSQL);
	    if(err) console.log('error',err);
            
         console.log("sucess");
         console.log(result);  
         //res.json(result);         
			           
        });
    });

});

var server = app.listen(3000, function () {
    console.log('Server is running..on 3000');
});