const config = require('../config/configuration.js');
var getlogtime = require('../routes/login.js');
var express = require('express');
var app = express();
var logintt = require('../routes/logintime.js');


var moment = require('moment');
var time = moment();
var ip = require("ip");
var logouttime, session, ipadd, date;

exports.logoutfunc = (req, res) => {

    var uname = req.headers.user;
   
    
    var logintime = req.headers.time;
    console.log("login time="+logintime);

    var today = new Date();
    var sql = require("mssql");
    var today_date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();   

    ipadd = ip.address();
    var start_time = today.toDateString() + ' ' + today.getHours() + ':' + today.getMinutes();
 


    //logout time
    var aa = new Date().toString();
   // console.log(aa.split('G')[0]);
    var bb = aa.split('G')[0];

    function diff_minutes(dt2, dt1) {

        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));

    }

    dt1 = new Date(start_time);
    dt2 = new Date(bb);
    //console.log(diff_minutes(dt1, dt2));
    var hour = Math.floor(diff_minutes(dt1, dt2) / 60);
    var min = diff_minutes(dt1, dt2) % 60;
    session = hour + ':' + min;
    logouttime = time.format('H:mm a');

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);
        var request = new sql.Request();
        var sSQL = 'INSERT INTO loginData(date,login_time,logout_time,session,ip,username) values (\'' + today_date + '\',\'' + logintime + '\',\'' + logouttime + '\',\'' + session + '\',\'' + ipadd + '\',\'' + uname + '\')';
        
       
        request.query(sSQL, function (err, result, fields) {
            console.log(sSQL);
            if (err) console.log('error', err);

            console.log(result);

        });
      
    });
    


};
