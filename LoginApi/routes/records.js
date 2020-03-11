const config = require('../config/configuration.js');
var moment = require('moment');
var time = moment();
var express = require('express');
var app = express();
var logintime;
var aa;

//edit function
exports.recordfunc = (req, res) => {

    var user = req.headers.user;
   // req.setTimeout(50000);

    var sql = require("mssql");


    sql.connect(config, function (err) {

        if (err) console.log(err);
        var request = new sql.Request();

      
        var ss = 'SELECT * from userDetails where FIRST_NAME=\'' + user + '\'';
        request.query(ss, function (err, result, fields) {
            console.log(ss);
            if (err) console.log('error', err);

            res.send(result);
            console.log(result);
           
            //aa = result.recordset[0].id;

        });

    });
}


