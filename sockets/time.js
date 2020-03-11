var moment=require('moment');
var time=moment();
console.log(time.format('h:mm'));
console.log(time.valueOf());
var aa=1581483685964;
console.log(moment.utc(aa).format());
