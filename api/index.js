//rest api

var crypt=require('crypto');
var uuid=require('uuid');
var express=require('express');
var mssql=require('mssql');
var bodyparser=require('body-parser');
var app=express();

//connection
var con = {
  server: "localhost",
  user: "sa", 
  password: "pass123",
  database:"testdb"
};

mssql.connect(con,function(err) {
  if (!err){
	   console.log("Connected!");
	   
  }else{
	  console.log("Not Connected!");
  throw err;
  }
});

var genRandomString=function(length){
	return crypt.length/2
	//.toString('hex')

};

var sha512=function(password,salt){
	//var hash=crypt.createHmac('sha512',salt);
	//hash.update(password);
	//var value=hash.digest('hex');
	return{
		salt:salt,
		passwordHash:password
	}
};

function saltHashPassword(userPassword){
	var salt=genRandomString(16);
	var passwordData=sha512(userPassword,salt);
	return passwordData;
}

/* app.get('/test',(req,res,next)=>{
	console.log('123456');
	var encrypt=saltHashPassword('123456');
	console.log('enc:'+encrypt.passwordHash);
	console.log('salt:'+encrypt.salt);
}); */
app.use(bodyparser.json);
app.use(bodyparser.urlencoded({extended:true}));

app.post('/login',(req,res,next)=>{
	var postdata=req.body;
	var uid=uuid.v4();
	var plainpass=postdata.password;
	var hash_data=saltHashPassword(plainpass);
	var password=hash_data.passwordHash;
	var salt=hash_data.salt;
	
	var name=postdata.name;
	var email=postdata.email;
	
	mssql.query('SELECT * FROM user where name=?',[name],function(err,result,fields){
		mssql.on('error',function(err){
			console.log('error',err);
		});
	});
	 if(result && result.length)
		res.json('already exists');
	else{
		mssql.query('INSERT INTO user(unique_id,name,email,encrypted_password,salt,created_at,updated_at) VALUES (?,?,?,?,?,NOW(),NOW())',[uid,name,email,password,salt],function(err,result,fields){
			
			console.log(' insert error',err);
			res.json('register error',err);		
		});
		res.json('register success');
		
	} 
});

app.post('/login',(req,res,next)=>{
	var postdata=req.body;
	var userpass=postdata.password;
	//var email=postdata.email;
	var name=postdata.name;
	
	mssql.query('SELECT * FROM user where name=?',[name],function(err,result,fields){
		mssql.on('error',function(err){
			console.log('error',err);
		});
	});
	 if(result && result.length){
		var salt=result[0].salt;
		var encrypted_password=result[0].encrypted_password;
		
	 }
	else{			
			res.json('user not exits');
					
		});
	
		
	} 
	
	});
	
});

//server
app.listen(3000,()=>{
	console.log('server started in 3000 port...');
})