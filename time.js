var moment=require('moment');
var time=moment();
var requestip=require('request-ip');
var today=new Date();
var express=require('express');
var app=express(); 
 
var a=time.format('H:mm');
console.log(a);
var b=time.format('h:mm a');
var ltime = '2020-02-22T10:21:37.851';
//console.log(time.subtract(a,b));
/* console.log(time.format());
time.subtract(1,'date');
console.log(time.format()); */
//console.log(moment().startOf().fromNow());
/* 
var m1 = moment(ltime).subtract(ltime, 'hours');
console.log(m1);
m2=JSON.stringify(m1);
var tt = m2.split('T')[1];
var hour = tt.split(':')[0];
var mins = tt.split(':')[1];
console.log('hr ',parseInt(hour)+5,'min',parseInt(mins)+30); */



console.log(new Date().toString());
//jhjkhkhk
var aa=new Date().toString();
console.log(aa.split('G')[0]);
var bb=aa.split('G')[0];
//sub
function diff_minutes(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
  
 }

dt1 = new Date("feb 23 2020 00:20:00");
dt2 = new Date(bb);
console.log(diff_minutes(dt1, dt2));
console.log(Math.floor(diff_minutes(dt1, dt2)/60));
console.log(diff_minutes(dt1, dt2)%60);
console.log(today.getHours()+' '+today.getMinutes());



//var ip = require("ip");
//console.log( ip.address());



//console.log(today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear());


/* 
var server = app.listen(3000, function () {
    console.log('Server is running..on 3000');
}) */;
 
 