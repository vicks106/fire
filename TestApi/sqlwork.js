var Sequelize=require('sequelize');
var sequelize=new Sequelize(undefined,undefined,undefined,{
	'dialect':'sqlite',
	'storage':'sqlwork.sqlite'
});

var Work=sequelize.define('work',{
	id:{
		type:Sequelize.INTEGER,
		primaryKey:true,
		autoIncrement:true		
	},
	name:{
		type:Sequelize.STRING,		
	},
	age:{
		type:Sequelize.INTEGER
	}
})

Work.sync().then(function(){
	var data={
		name:'vicks',
		age:30
	}
	
	Work.create(data).then(function(work){
		console.log('created successfully');
	})
})