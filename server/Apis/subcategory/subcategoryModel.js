const mongoose = require('mongoose')

const subcategoryschema = new mongoose.Schema({
    categoryId: {type: mongoose.Schema.Types.ObjectId, default: null, ref: "category"},
    subcategoryId: {type: Number},
    subcategoryname: {type: String, default: null},
    status: {type: Boolean, default: true},
    created_at: {type: Date, default: Date.now()}
})
module.exports = new mongoose.model('subcategory',subcategoryschema)