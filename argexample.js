var one=require('yargs')
	.command('hellll','2nd argument',function(yargs){
		yargs.option({
			name:{
				demand:true
				
			}
		}).help('help')
	})
	.argv;








console.log(one);

if(one._[0]==='hello')
	console.log('it works');