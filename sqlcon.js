var mysql=require('mysql');
var mssql=require('mssql');

var con = {
  server: "192.168.1.127",
  port:1433,
  user: "sa", 
  password: "pass123",
  database:"testdb"
};

mssql.connect(con,function(err) {
  if (!err){
	   console.log("Connected!");
	   console.log('select * from login');
  }else{
	  console.log("Not Connected!");
  throw err;
  }
});

//con.end();