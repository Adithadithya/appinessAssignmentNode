var mongoose = require('mongoose');
var schema = mongoose.Schema;

var users={
    user_id:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    emp_name:{
        type:String,
        required:true
    },
    email_id:{
        type:String,
        required:false
    }
    
}
module.exports=users;