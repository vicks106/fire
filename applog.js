const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const logger = new Logger('app')
const Logger = require('./logger_service.js')
var morgan = require('morgan')



app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())
app.use(morgan('dev'));

app.post('/test', (req, res) => {
    const body = req.body
    let error = {}


    logger.info("Request recieved at /test", req.body)

    
     if (body.name == null || body.name == "") {
        logger.error("Name field is empty")
        error["name"] = "name field is empty"
    }
    if (body.age == null || body.age == "") {
        logger.error("Age field is empty")
        error["age"] = "age field is empty"
    }
    if (body.gender == null || body.gender == "") {
        logger.error("Gender field is empty")
        error["gender"] = "gender field is empty"
    } 
    if (Object.keys(error).length != 0) {
        logger.error("Retun error response", {
            "sucess": false
        })
        res.send("Error")
    } else {
        logger.info("Retun sucess response", {
            "sucess": true
        })
        res.send("No Error")
    }
})

app.listen(3000, () => {
    console.log("APP LAUNCHED IN PORT 3000")
    logger.info("APP LAUNCHED IN PORT 3000")
})