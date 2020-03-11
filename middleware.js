//middleware
var middleware={
	requireAuthentication:function(res,req,next){
		console.log('route hit ');
		next();
	},
	logger:function(req,res,next){
		console.log('Request '+new Date().toUTCString()+' '+req.method+'on'+req.originalUrl);
		next();
	}
};

module.exports=middleware;