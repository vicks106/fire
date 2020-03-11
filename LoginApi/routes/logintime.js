var moment=require('moment');
var time=moment();
var logintime;


//method 1
 exports.logtime=()=>{
logintime=time.format('H:mm a');
return logintime;
}; 


//method2
/* var logtime={

    log:time.format('H:mm a')
};
console.log(logtime.log);
console.log(logtime);

module.exports=logtime; */