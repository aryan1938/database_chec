const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    PostID:{type:Number , default:0},
    Content:{type:String, default:''},
    Images:{type:String, default:''},
    UserID:{ type: mongoose.Schema.Types.ObjectId, default: null, ref:'user'},
    ThreadID:{ type: mongoose.Schema.Types.ObjectId, default: null, ref:'thread'},
    CreationDate:{type:Date, default:Date.now},
    Status:{type:Boolean, default:true}
})

module.exports = new mongoose.model('post',postSchema)