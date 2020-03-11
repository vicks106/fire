var assert=require('chai').assert;
var app=require('../app')

describe('App Name',function(){
    let result=app.welcome();
    let result2=app.add(3,3);

    it('app should return welcome',function(){
        assert.equal(result,'welcome');
    });

    it('app has String data type',function(){
        assert.typeOf(result,'string');
    });

    it('app value should have more than 6',function(){
        assert.isAtLeast(result2,6);
    })

});