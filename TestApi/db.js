var Sequelize=require('sequelize');
var sequelize=new Sequelize(undefined,undefined,undefined,{
	'dialect':'sqlite',
	'storage':__dirname+'/data/todoapi.sqlite'
});

var db={};

db.todo=sequelize.import('./todo.js');
db.user=sequelize.import('./user.js');
db.sequelize=sequelize;
db.Sequelize=Sequelize;

db.todo.belongsTo(db.user);
db.user.hasMany(db.todo);

module.exports=db;