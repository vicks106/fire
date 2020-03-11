const config = require('../config/configuration.js');
const Logger = require('../logger/logger_service.js')
const logger = new Logger('Register')
var morgan = require('morgan')



exports.registerfunc = (req, res) => {

    const body = req.body
    let error = {}

    logger.info("Request recieved at /Register", req.body)

    var choice = req.headers.idd;
    //  console.log(choice);
    var fname = req.headers.fname;
    var lname = req.headers.lname;
    var email = req.headers.emaill;
    var mob = req.headers.no;
    var user = req.headers.user;
    var pass = req.headers.pass;
    var imgg = req.headers.img;


    var sql = require("mssql");


    // connect to your database
    sql.connect(config, function (err) {


        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        //edit query

        if (choice == '0') {
            var sSQL = 'INSERT INTO userDetails(FIRST_NAME,LAST_NAME,EMAIL,MOBILE_NO,USERR,PASSWORD,IMG) values (\'' + fname + '\',\'' + lname + '\',\'' + email + '\',\'' + mob + '\',\'' + user + '\',\'' + pass + '\',\'' + imgg + '\')';

        } else {
            var sSQL = 'UPDATE userDetails SET FIRST_NAME =\'' + fname + '\',LAST_NAME=\'' + lname + '\',EMAIL=\'' + email + '\',MOBILE_NO=\'' + mob + '\',USERR=\'' + user + '\',PASSWORD=\'' + pass + '\',IMG=\'' + imgg + '\' WHERE ID=\'' + choice + '\'';
        }
        request.query(sSQL, function (err, result, fields) {
            // console.log(sSQL);
            if (err) console.log('error', err);

            // console.log("sucess");
            try {
                var aa = result.rowsAffected;

                if (aa == 0) {
                    logger.error("Retun error response");
                    res.send('invalid credentials');
                } else {
                    logger.info("Retun sucess response");
                    res.send("sucess");
                }
            } catch (e) {
                //console.log(e);
            }

        });
    });
}

