function work(data){
		return new Promise(function(resolve,reject){
			resolve('works');
			reject('fial');
		});		
}

work().then(function(data){
	console.log(data);
	console.log(data);
},function(error){
	console.log(error);
});