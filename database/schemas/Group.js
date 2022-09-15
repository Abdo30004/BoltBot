const {Schema,model} = require('mongoose');

const GroupSchema = new Schema({
    id:{required:true,type:String},
    name:{required:true,type:String},
    createdAt:{required:true,type:Date},
    owner:{required:true,type:String},
})
const Group = model('Group',GroupSchema);
module.exports = Group;