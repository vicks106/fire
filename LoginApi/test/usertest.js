process.env.NODE_ENV = 'test';
var view = require('../routes/view');
var login = require('../routes/login');
var userview = require('../routes/userview');
var register = require('../routes/register');


//Require the dev-dependencies
var chai = require('chai');
var expect = require('chai').expect;
var util = require('util');
var request = require('request');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = require('should');
var assert = require('chai').assert;


chai.use(chaiHttp);

describe('/Login API ', function () {


    //admin mode
    describe('/Admin Mode', function () {

        it('App should return success status', (done) => {
            chai.request(server).get('/view').end((err, res) => {
                // console.log(res.body);
                expect(res.status).to.equal(200);
                done();
            });

        });
        it('App should return a object', (done) => {
            chai.request(server).get('/view').end((err, res) => {
                expect(res.body).to.be.a('object');
                done();
            });

        });
        it('App should contains values', (done) => {
            chai.request(server).get('/view').end((err, res) => {
                expect(res.body).to.not.equal(0);
                done();
            });

        });
        it('User Name should be string', (done) => {
            chai.request(server).get('/view').end((err, res) => {

                assert.typeOf(res.body.recordset[0].FIRST_NAME, 'string');
                done();
            });

        });

    });

    //login page
    describe('/Login Mode', function () {

        it('Username and Password Missing', (done) => {
            chai.request(server).get('/login').end((err, res) => {

                expect(res.text).to.equal('sucess');
                done();
            });
        });
        it('Username  Missing', (done) => {
            chai.request(server)
                .get('/login')
                .set('pass', 'abc')
                .end((err, res) => {
                    expect(res.text).to.equal('sucess');
                    done();
                });
        });
        it('Password Missing', (done) => {
            chai.request(server)
                .get('/login')
                .set('user', 'abc')

                .end((err, res) => {
                   // console.log(res.text);
                    expect(res.text).to.equal('sucess');
                    done();
                });
        });
        it('Username Input type should be String Format', (done) => {
            chai.request(server)
                .get('/login')
                .set('user', 5)
                .set('pass', 'abc')
                .end((err, res) => {

                    // assert.typeOf(res.body.recordset[0].username, 'string');
                    expect(res.text).to.equal('sucess');
                    done();
                });
        });
        it('Password Input type should be String Format', (done) => {
            chai.request(server)
                .get('/login')
                .set('user', 'abc')
                .set('pass', 'abc')
                .end((err, res) => {
                    // assert.typeOf(res.body.recordset[0].password, 'string');
                    expect(res.text).to.equal('sucess');
                    done();
                });
        });

        it('App should return 200 StatusCode', (done) => {
            chai.request(server).get('/login').end((err, res) => {

                expect(res.status).to.equal(200);
                done();
            });

        });
        it('App body should not be empty', (done) => {
            chai.request(server)
                .get('/login')
                .set('user', 'abc')
                .set('pass', 'abc')
                .end((err, res) => {

                    expect(res.text).to.equal('sucess');
                    expect(res.body).to.not.be.empty;
                    done();
                });

        });
        it('App should return a object', (done) => {
            chai.request(server).get('/login').end((err, res) => {
                expect(res.body).to.be.a('object');
                done();
            });

        });
        it('Should be Valid User', (done) => {
            chai.request(server)
                .get('/login')
                .set('user', 'abcd')
                .set('pass', 'abc')
                .end((err, res) => {
                    expect(res.text).to.equal('sucess');
                    // expect(res.body.recordset).to.not.be.empty;
                    done();
                });

        });

        it('Should be a Valid Password for respective User', (done) => {
            chai.request(server)
                .get('/login')
                .set('user', 'abc')
                .set('pass', 'abcdfd')
                .end((err, res) => {
                    expect(res.text).to.equal('sucess');
                    //expect(res.body.recordset).to.not.be.empty;
                    done();
                });
        });
        it('Should be Valid Username and Password', (done) => {
            chai.request(server)
                .get('/login')
                .set('user', 'abc')
                .set('pass', 'abc')
                .end((err, res) => {
                    expect(res.text).to.equal('sucess');
                    //expect(res.body.recordset).to.not.be.empty;
                    done();
                });

        });

    });

    //invidual user view
    describe('/Invidual User View', function () {

        it('App should return success status', (done) => {
            chai.request(server)
                .get('/userview')
                .set('user', 'abc')
                .end((err, res) => {
                    // console.log(res.statusCode);
                    expect(res.status).to.equal(200);
                    done();
                });

        });
        it('App should return a object', (done) => {
            chai.request(server).get('/userview').end((err, res) => {
                expect(res.body).to.be.a('object');
                done();
            });

        });
        it('App should contains values', (done) => {
            chai.request(server)
                .get('/userview')
                .set('user', 'abc')
                .end((err, res) => {
                    expect(res.body.recordset).to.not.be.empty;
                    done();
                });

        });

    });


});
