const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    CategoryID:{type:Number, require , default:0},
    CategoryName:{type:String, default:''},
    CreationDate:{type:Date, default:Date.now},
    Status:{type:Boolean, default:true}
})

module.exports = new mongoose.model('category',categorySchema)