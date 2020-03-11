console.log('starting of password manager app');

var storage=require('node-persist');
storage.initSync();

//storage.setItemSync('name','vicks');storage.setItemSync('accounts',[{
	//username:'hari',
//	age:20
//}]);

//var name=storage.getItemSync('accounts'.'age');
//console.log(name);

var one =require('yargs')
	.command('create','new account',function(yargs){
		yargs.option({
			name:{
				demand:'true',
				type: 'string',
				description:'account name'
			},
			username:{
				demand:'true',
				type: 'string',
				description:'account user name'
			},
			password:{
				demand:'true',
				type: 'string',
				description:'account password'
			}
		})
	}).help('help')
	.command('get','view account',function(yargs){
		yargs.option({
			name :{
				demand:'true',
				type: 'string',
				description:'account name'
			}
		})
	})
	.help('help')
	.argv;


function createaccount(account){
	var accounts=storage.getItemSync('accounts');
	if(typeof accounts === 'undefined'){
		accounts =[];
	}
	accounts.push(account);
	storage.setItemSync('accounts',accounts);
	
	return account;
}

function getaccount(accountname){
	var accounts=storage.getItemSync('accounts');
	var matchedacc;
	accounts.forEach(function(account){
		if(account.name===accountname){
			matchedacc=account;
		}
	});
	return matchedacc;
}

var check=one._[0];
if(check === 'create'){
	var createdaccount = createaccount({
		name:one.name,
		username:one.username,
		password:one.password
	});
	console.log('account created');
	console.log(createdaccount);
	
}else if(check==='get'){
	
	var getacc= getaccount(one.name);
	if(typeof getacc==='undefined'){
		console.log('account not found');
	}else{
		console.log('accountfound');
		console.log(getacc);
	}
	
}
//createaccount({
	//name :'fb',
//	username :'abc@gmail.com',
	//pass: 'asdf'
//
//});

//var fbacc=getaccount('asdf');
//console.log(fbacc);