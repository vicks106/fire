var PORT=3000;
var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var moment=require('moment');

app.use(express.static(__dirname+'/public'));
var clientinfo={};

io.on('connection',function(socket){
	console.log('socket io connected');
	
	socket.on('joinroom',function(req){
		clientinfo[socket.id]=req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message',{
			name:' ',
			text:req.name+' has joined'
		});
	});
	
	socket.on('message',function(message){
		console.log('Received: '+message.text);
		
		message.timestamp=moment().valueOf();
		socket.broadcast.to(clientinfo[socket.id].room).emit('message',message);
		//io.to(clientinfo[socket.id].room).emit('message',message);
	});
	
	socket.emit('message',{
		text:'welcome chat app',
		timestamp:moment().valueOf()
	});
});

http.listen(PORT,function(){
	console.log('server started');
});