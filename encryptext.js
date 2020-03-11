var cryptoo=require('crypto-js');
var one={
	name:'vic',
	age:20
}
var key='123abqw123434546565638677676767adfghjkl';

var encc=cryptoo.AES.encrypt(JSON.stringify(one),key);
console.log("something went wrong="+encc);

var ss=cryptoo.AES.decrypt(encc,key);
var two=JSON.parse(ss.toString(cryptoo.enc.Utf8));
console.log(two.name);
console.log(two);
