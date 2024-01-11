const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
    ReplyID:{type:Number, require , default:0},
    Content:{type:String, default:''},
    UserID:{ type: mongoose.Schema.Types.ObjectId, default: null, ref:'user'},
    PostID:{ type: mongoose.Schema.Types.ObjectId, default: null, ref:'post'},
    CreationDate:{type:Date, default:Date.now},
    Status:{type:Boolean, default:true}
})

module.exports = new mongoose.model('reply',replySchema)