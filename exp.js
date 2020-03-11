var exp=require('express');
var app=exp(); 
var PORT= process.env.PORT||3000;
 app.get('/',function(req,res){
	res.send('hello world');
});

var middleware =require('./middleware.js');
app.use(middleware.logger);
app.use(middleware.requireAuthentication); 
app.use(exp.static(__dirname+'/public'));

app.listen(PORT,function(){
	console.log('express server listening begins in='+PORT+' port');
});