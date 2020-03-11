 var express =require('express');
 var bodyparser=require('body-parser');
 var _ =require('underscore');
 var db=require('./db.js');
 var bcrypt=require('bcrypt');
 var middleware=require('./middleware.js')(db);
 
 var app=express();
 var PORT=3000;
 var todos=[];
 var nexttodo=1;
 
 app.use(bodyparser.json());
  var todo=[{
	 id:1,
	 description:'first array element',
	 completed:false
 },
 {
	 id:2,
	 description:'second array element',
	 completed:false
 }];
 
 app.get('/',function(req,res){
	res.send('Testing api');
 });
 
 app.get('/todo',function(req,res){
	 res.json(todo);
	
 });
 
app.get('/todos',function(req,res){
	//res.json(todos);
	 db.todo.findAll().then(function(todo){
		 res.json(todo);
	 });
})
  
  app.get('/todos/:id',middleware.requireAuthentication,function(req,res){
	 var reqid=parseInt(req.params.id,10);
	 //var bodyid; 
	 db.todo.findById(reqid).then(function(todo){
		 if(!!todo){
			 res.json(todo.toJSON());
		 }else{
			 res.status(404).json.send();
		 }
	 })
	 
	/*  todo.forEach(function(todo){
		 if(reqid===todo.id){
			 bodyid=todo;
		 }
		 
	 }); */
	  /* var bodyid=_.findWhere(todo,{id:reqid});
	 if(bodyid){
		 res.send(bodyid);
	 }else{
		 res.status(404).send();
	 } */
	 
	//res.send('requesting id='+req.params.id);
 }); 
 
 //post method
 app.post('/todos',function(req,res){
	 //var body=._pick(req.description,req.completed);
	 var body=req.body;
	 db.todo.create(body).then(function(todo){
		// 
		req.user.addTodo(todo).then(function(){
			return todo.reload();
		}).then(function(){
			res.json(todo.toJSON());
		});
	 },function(e){
		 res.status(400).json(e);
	 });
	/*  var body=req.body;
	 
	 body.id=nexttodo++;
	 console.log('description:'+body.description);
	 console.log('name='+body.name);
	
	 todos.push(body);
	  res.json(body); */
 });
  app.get('/todos',middleware.requireAuthentication,function(req,res){
	 res.json(todos);
 });
 //to delete 
 app.delete('/todos/:id',middleware.requireAuthentication,function(req,res){
	  var reqid=parseInt(req.params.id,10);
	  db.todo.destroy({
		  where:{
			  id:reqid
		  }
	  }).then(function(rowDelete){
		  if(rowDelete===0){
			  res.status(404).json({
				  error:'not found'
			  })
		  }else{
			  res.status(204).send();
		  }
	  })
	/*  var bodyid=_.findWhere(todos,{id:reqid});
	 
	 if(!bodyid){
		 res.status(404).json({"error":"ok error"});
	 }else{
		todos=_.without(todos,bodyid) ;
		res.json(bodyid);
	 }	  */
 });
 
 //authentication post method
 //signup
 app.post('/user',function(req,res){
	 var body=req.body
	 db.user.create(body).then(function(todo){
		 res.json(todo.toJSON());
	 },function(e){
		 res.status(400).json(e);
	 });
 })
 
 //emailcheckpost method
 app.post('/user/login',function(req,res){
	 var body= _.pick(req.body,'email','password');
	 
	 db.user.authentication(body).then(function(user){
		 res.header('Auth',user.generateToken('authentication')).json(user.toPublicJSON());
	 },function(){
		 res.status(401).send();
	 })
	
	
 })
 
 db.sequelize.sync().then(function(){
	 app.listen(PORT,function(){
	console.log('server started on port no='+PORT);
 });
 });
 
 