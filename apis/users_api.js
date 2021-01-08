const express = require('express');
const users = require('../controllers/users/users');


const route = express.Router();

route.post('/register',users.register);
route.delete('/deleteAll',users.deleteAll);
route.get('/fetchAll',users.fetchAll);
module.exports = route;