console.log('starting of password manager app');

var storage=require('node-persist');
var crypto=require('crypto-js');
storage.initSync();


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
			},
			master:{
				demand:'true',
				type: 'string',
				description:'key value'
			}
		})
	}).help('help')
	.command('get','view account',function(yargs){
		yargs.option({
			name :{
				demand:'true',
				type: 'string',
				description:'account name'
			},
			master:{
				demand:'true',
				type: 'string',
				description:'key value'
			}
		})
	})
	.help('help')
	.argv;

function getaccountdetails(master){
	
	var encryptedacco=storage.getItemSync('accounts');
	var accounts=[];
	if(typeof encryptedacco !== 'undefined'){
		var ss=crypto.AES.decrypt(encryptedacco,master);
		accounts=JSON.parse(ss.toString(crypto.enc.Utf8));
	
	}
		return accounts;
}
function saveencacc(accounts,master){
	
	var encryptacc= crypto.AES.encrypt(JSON.stringify(accounts),master);
	storage.setItemSync('accounts',encryptacc.toString());
	return accounts;
	
	
}
function createaccount(account,master){
	var accounts=getaccountdetails(master);
	
	accounts.push(account);
	saveencacc(accounts,master);
	
	return account;
}

function getaccount(accountname,master){
	var accounts=getaccountdetails(master);
	
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
	},one.master);
	console.log('account created');
	console.log(createdaccount);
	
}else if(check==='get'){
	
	var getacc= getaccount(one.name,one.master);
	if(typeof getacc==='undefined'){
		console.log('account not found');
	}else{
		console.log('accountfound');
		console.log(getacc);
	}
	
}