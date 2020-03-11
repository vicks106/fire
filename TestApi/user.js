var bcrypt=require('bcrypt');
var _=require('underscore');
var jwt=require('jsonwebtoken');
var cryptojs=require('crypto-js');


module.exports=function(sequelize,DataType){
	var user= sequelize.define('user',{
		email:{
			type:DataType.STRING,
			allowNull:false,
			unique:true,
			validate:{
				isEmail:true
			}
		},
		salt:{
			type:DataType.STRING
			
		},
		password_hash:{
			type:DataType.STRING
		},
		password:{
			type:DataType.VIRTUAL,
			allowNull:false,
			validate:{
				len:[5,50]
			},
			set:function(value){
				var salt=bcrypt.genSaltSync(10);
				var hashedpass=bcrypt.hashSync(value,salt);
				
				this.setDataValue('password',value);
				this.setDataValue('salt',salt);
				this.setDataValue('password_hash',hashedpass);
			}
		}
	},{
		classMethods:{
			authentication:function(body){
				return new Promise(function(resolve,reject){
					if(typeof body.email !=='string'||typeof body.password !=='string'){
						return reject();
					}
		
					user.findOne({
						where:{
							email:body.email
						}
					}).then(function(user){
						if(!user||!bcrypt.compareSync(body.password,user.get('password_hash'))){
							return reject();
						}
						resolve(user);
					}); 
				});
			},
			findByToken:function(token){
				return new Promise(function(resolve,reject){
					try{
						var decodeJwt=jwt.verify(token,'vicks106');
						var decodedData=cyrptojs.AES.decrypt(decodeJwt.token,'abc123');
						var tokenData=JSON.parse(decodedData.toString(cryptojs.enc.Utf8));
						
						user.findById(tokenData.id).then(function(user){
							if(user){
								resolve(user);
							}else{
							
								reject();
							}
						},function(e){
						
							reject();
						});
						
					}catch(e){
						
						reject();
					}
				});
			}
		},
		instanceMethods:{
			toPublicJSON:function(){
				var json=this.toJSON();
				return _.pick(json,'id','email');
			},
			generateToken:function(type){
				if(!_.isString(type)){
					return undefined;
				}
				try{
					var data=JSON.stringify({id:this.get('id'),type:type});
					var encryptedData=cryptojs.AES.encrypt(data,'abc123').toString();
					var token=jwt.sign({
						token:encryptedData
					},'vicks106');
					return token;
					
				}catch(e){
					console.error(e);
					return undefined;
				}
			}
		}
	});
	return user;
}