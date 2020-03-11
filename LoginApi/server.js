
var login = require('./routes/login.js');
var register=require('./routes/register.js');
var logout=require('./routes/logout.js');
var record=require('./routes/records.js');
var view=require('./routes/view');
var userview=require('./routes/userview');
var express=require('express');
var app=express();

app.get('/login',login.loginfunc);
app.get('/register',register.registerfunc);
app.get('/logout',logout.logoutfunc);
app.get('/records',record.recordfunc);
app.get('/view',view.viewfunc);
app.get('/userview',userview.userviewfunc);

var server=app.listen(3000, function (req, res) {
    console.log('Server is running..on 3000');
});
module.exports = server
//server.timeout = 10000;