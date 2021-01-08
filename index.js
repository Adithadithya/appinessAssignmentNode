var express = require('express');
var route = require('./route')
var app = express();
var cors = require('cors')

app.use(cors())
var bodyParser = require('body-parser')
 app.use(bodyParser.json({limit:"10mb"}))

 app.use('/appiness',route)

app.listen(3000);