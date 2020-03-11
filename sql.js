var pg = require('pg');
const client = new pg.Client(
{
    user: 'sa',
    host: 'localhost',
    database: 'testdb',
    password: 'pass123',
    port: 1433
});
client.connect(function (err){
    if(err)
        console.log(err);
    else
        console.log("Connected!");
});

//client.end();