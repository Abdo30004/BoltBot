const {Schema,model} = require('mongoose');

const UserSchema = new Schema({
    number:{required:true,type:String},
    name:{required:true,type:String},
    country:{required:true,type:String},
    blocked:{required:true,type:Boolean},   
    business:{required:true,type:Boolean},
})
const User = model('User',UserSchema);
module.exports = User;