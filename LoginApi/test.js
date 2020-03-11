/* var config=require('./config/configuration.js');
console.log(config.user); 
var login=require('./routes/login.js'); */
var moment=require('moment');
var time=moment();
var express=require('express');
var app=express();

var logintt=require('./routes/logintime.js');

var tim=logintt.logtime();
//console.log(aa);

//var date = new Date();
//var today_date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
//var start_time = today_date +' '+today.getHours() + ' ' + today.getMinutes();
    //console.log(start_time);
    //console.log(date.toDateString());

    







