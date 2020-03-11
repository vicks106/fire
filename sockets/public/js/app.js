function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]).replace(/\+/g,' ');
        }
    }
    
    return undefined;
}

var name=getQueryVariable('name');
var room=getQueryVariable('room');

console.log(name+' wants to join in '+room);
jQuery('.room_title').text(room);

var socket=io();

socket.on('connect',function(){
	console.log('socket web io connected');
	socket.emit('joinroom',{
		name:name,
		room:room
	});
});

socket.on('message',function(message){
	var time=moment.utc(message.timestamp);
	console.log('received:'+message.text);
	//console.log('time:'+time.format('h:mm');
	var $msg2=jQuery('.msg');
	
	//$msg2.append('<p>'+message.name+'</p>');
	$msg2.append('<p>'+message.name+' '+message.text+'  '+time.local().format('h:mm a')+'</p');
});

var $form=jQuery('#msg-form');

$form.on('submit',function(event){
	
	event.preventDefault();
	
	var $msg=$form.find('input[name=message]');
	
	socket.emit('message',{
		name:name,
		text:$msg.val()
	});
	
	$msg.val(' ');
	
});