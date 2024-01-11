const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    UserID: { type: Number, require, default: 0 },
    Username: { type: String, default: '' },
    Password: { type: String, default: '' },
    Email: { type: String, default: '' },
    ProfilePicture: { type: String, default: "user/default.jpg" },
    RegistrationDate: { type: Date, default: Date.now },
    UserType: { type: String, default: "2" }, //1=>Admin, 2=>Student , 3=> Staff
    Status: { type: Boolean, default: true }
})

module.exports = new mongoose.model('user', userSchema)