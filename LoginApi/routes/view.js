const config = require('../config/configuration.js');
var moment = require('moment');
var time = moment();
var express = require('express');
var app = express();


exports.viewfunc = (req, res) => {


    var sql = require("mssql");

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records 
        var sSQL = 'select  distinct FIRST_NAME,USERR,PASSWORD FROM userDetails left join loginData on  userDetails.USERR=loginData.username';
        request.query(sSQL, function (err, result, fields) {

            // console.log(sSQL);
            if (err) console.log('error', err);

            res.send(result);
            //console.log(result);	


        });
    });
}


