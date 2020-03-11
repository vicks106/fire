

	
var weather=require('./file1.js');
//just();
var location=require('./location.js');

 location(function(loca){
	if(!loca){
		console.log('error');
		return;
	}
	console.log('location='+loca.city);
	//console.log('log/lat='+loca.loc);
	//console.log('region='+loca.region);
});

//just(function(weather){
	//console.log(weather);
//});

 
 var one=require('yargs')
 .option('location',{
	 alias:'l',
	 demand:false,
	 description:'enter location',
	 type:'string'
 }).argv;
 
 weather(one.l,function(callb){
	 console.log(callb);
 });