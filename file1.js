//module.exports=function(){
	//console.log('ok got it');
//}
//console.log('whatever');
//module.exports();

var weather=require('request');
var aa;

module.exports=function(location,call){
	aa=encodeURIComponent(location);
	var url='https://samples.openweathermap.org/data/2.5/weather?q='+aa+'&appid=b6907d289e10d714a6e88b30761fae22';
	
	if(!location){
		return call('no location found');
	}
	weather({
	url:url,
	json:true
	},
	function(error,response,body){
		if(error){
			call('error whlie opening link');
		}else{
			//call(JSON.stringify(body,null,4));
			call(body.name);
		}
	});
	
}