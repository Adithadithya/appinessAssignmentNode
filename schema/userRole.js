var mongoose = require('mongoose');
var schema = mongoose.Schema;

var usersRole={
    user_id:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
   
    
}
module.exports=usersRole;