const express = require('express');

const app = express();

const userMaster = require('./apis/users_api')

app.use('/users',userMaster)

module.exports= app;