var mysql = require('mysql');

var con=mysql.createConnection({
 host: "192.168.1.127",
 port:1433,
 user: "sa",
 password: "pass123",
 name: "testdb"
});

  

//connection = 'mysql://' + user + ':' + password + '@' + host + ':' + port + '/' + name;
//var connection='mysql://'+host+':'+port+'/'+name+';'+user+";"+password;



con.connect(function(err) {
  if (!err){
	   console.log("Connected!");
  }else{
	  console.log("Not Connected!");
  throw err;
  }
 
  //var sql = "CREATE TABLE testtable (name VARCHAR(255), address VARCHAR(255))";
 // con.query(sql, function (err, result) {
 //   if (err) throw err;
 //   console.log("Table created");
 // });
});

con.end();