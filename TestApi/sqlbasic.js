var Sequel=require('sequelize');
var sequelize=new Sequel(undefined,undefined,undefined,{
	'dialect':'sqlite',
	'storage':'sqlbasic.sqlite'
});

var TODO=sequelize.define('todo',{
	description:{
		 type:Sequel.STRING
	},
	completed:{
		type:Sequel.BOOLEAN
	}
})

var User=sequelize.define('user',{
	email:Sequel.STRING
});

TODO.belongsTo(User);
User.hasMany(TODO);

sequelize.sync({
	force:true
	}).then(function(){
	console.log('synched');
	
	User.create({ 
		email:'vic@gmail.com'
	}).then(function(){
		return TODO.create({
			description:'ok'
		});
	}).then(function(todo){
		User.findById(1).then(function(user){
			user.addTodo(todo);
		});
	});
});