const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
    ThreadID:{type:Number, require , default:0},
    Title:{type:String, default:''},
    Content:{type:String, default:''},
    UserID:{ type: mongoose.Schema.Types.ObjectId, default: null, ref:'user'},
    CategoryID:{ type: mongoose.Schema.Types.ObjectId, default: null, ref:'category'},
    CreationDate:{type:Date, default:Date.now},
    Status:{type:Boolean, default:true}
})

module.exports = new mongoose.model('thread',threadSchema)