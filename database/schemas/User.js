const {Schema,model} = require('mongoose');

const UserSchema = new Schema({
    number:{required:true,type:String},
    name:{required:true,type:String},
    country:{required:true,type:String},
    block:{
        ban:{type:Boolean,default:false},
        reason:{type:String,default:"none"},
        time:{type:Date,default:Date.now}
        
    },   
    business:{required:true,type:Boolean},
})
const User = model('User',UserSchema);
module.exports = User;