const User = require('./UserModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretkey = "##@$%^#%&#&$#%3635Ggwgy6#^#%^#&#&*#HY#%%#^#^&#"
const fs = require('fs')


const login = async (req, res) => {
    let validation = "";
    if (!req.body.Email) {
        validation += "Email is required"
    }
    if (!req.body.Password) {
        validation += "Password is required"
    }

    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }

    else {
      await  User.findOne({ Email: req.body.Email })
            .then(result => {
                if (result == null) {
                    res.send({ success: false, status: 500, message: "No User Found" })
                } else {
                    if (bcrypt.compareSync(req.body.Password, result.Password)) {
                        if (result.Status) {
                            let payload = {
                                _id: result._id,
                                Username: result.Username,
                                Email: result.Email,
                                UserType: result.UserType
                            }
                            let token = jwt.sign(payload, secretkey, { expiresIn: '10d' })
                            console.log("token:", token);
                            res.send({ success: true, status: 200, message: "Login Successfull", data: result, token: token })
                        }
                        else {
                            res.send({ success: false, status: 500, message: "Account is Blocked" })
                        }
                    } else {
                        res.send({ success: false, status: 500, message: "Invalid Credentials" })
                    }
                }

            })
            .catch((err) => {
                res.send({ success: false, status: 500, message: err.message })
            })
    }
}

const addUser = async (req, res) => {
    let validation = ''
    if (!req.body.Username) {
        validation += 'UserName is require'
    }

    if (!req.body.Password) {
        validation += 'Password is require'
    }

    if (!req.body.Email) {
        validation += 'Email is require'
    }

    if (!req.body.Password) {
        validation += 'Password is require'
    }

    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }
    else {
        let totalUser = await User.countDocuments()
        let newUser = new User({
            UserID: totalUser + 1,
            Username: req.body.Username,
            Email: req.body.Email,
            Password: bcrypt.hashSync(req.body.Password, 10),
            ProfilePicture: req.body.ProfilePicture
        })

        let prevUser = await User.findOne({ Email: (req.body.Email) })
        if (!!prevUser)
            res.send({ success: false, status: 500, message: 'User Exists with same email' })
        else {
            newUser.save().then(saveduser => {
                res.send({ success: true, status: 200, message: 'user added successfully', data: saveduser })
            }).catch(err => {
                res.send({ success: false, status: 500, message: err.message })
            })
        }
    }
}

const getAllUser = (req, res) => {
    User.find(req.body).then(result => {
        res.json({ success: true, status: 200, data: result, message: "All user loaded" })
    }).catch(err => {
        res.json({ success: false, status: 400, data: error })
    })
}


const getSingle = async (req, res) => {
  await  User.findOne({ _id: req.body._id })
        .then(result => {
            if (result == null) {
                res.json({
                    success: false,
                    status: 200,
                    message: "User not exist",
                    data: result
                })
            } else {
                res.json({
                    success: true,
                    status: 200,
                    message: "Single User Loaded",
                    data: result
                })
            }
        })
        .catch(error => {
            res.json({
                success: false,
                status: 500,
                message: error.message
            })
        })
}


const updateUser = async (req, res) => {
    let validation = ''
    if (!req.body._id) {
        validation += "_id is required"
    }

    if (!!validation) {
        res.json({ success: false, status: 500, message: validation })
    }

    else {
       await User.findOne({ _id: req.body._id })
            .then(async result => {
                if (result == null) {
                    res.json({ success: false, status: 500, message: "No user Found" })
                } else {
                    if (!!req.body.Username) {
                        result.Username = req.body.Username
                    }
                    if (!!req.body.Email) {
                        result.Email = req.body.Email
                    }
                    if (!!req.body.Password) {
                        result.Password = bcrypt.hashSync(req.body.Password, 10)
                    }
                    if (!!req.body.ProfilePicture) {
                        if(result.ProfilePicture==null||undefined||''){
                            result.ProfilePicture=req.body.ProfilePicture
                        }
                        else {
                        fs.unlinkSync('server/public/' + result.ProfilePicture)
               
                        result.ProfilePicture = req.body.ProfilePicture
                        }
                    }

                    let prevUser = await User.findOne({ Email: (req.body.Email) })
                    if (!!prevUser)
                        res.send({ success: false, status: 500, message: 'User Exists with same email' })
                    else {

                        result.save().then(updateUser => {
                            res.send({ success: 200, status: true, data: updateUser, message: "user update successfullt" })
                        })
                            .catch(error => {
                                res.send({ success: 500, status: false, message: error.message })
                            })
                    }
                }
            }).catch(error => {
                res.send({ success: false, status: 500, message: error.message })
            })
    }
}


const updatestatus = (req, res) => {
    let validation = ''
    if (!req.body._id)
        validation += '_id is required, '
    if (!req.body.Status)
        validation += 'status is required'
    if (!!validation)
        res.send({ success: false, status: 500, message: validation })
    else {
        User.findOne({ _id: req.body._id })
            .then(result => {
                if (result == null)
                    res.send({ success: false, status: 500, message: "No User found" })
                else {
                    if (!!req.body.Status)
                        result.Status = req.body.Status
                    result.save()
                        .then(updateresult => {
                            res.send({ success: true, status: 200, data: updateresult, message: "User Status Updated" })
                        })
                        .catch(error => {
                            res.send({ success: false, status: 500, message: error.message })
                        })
                }
            })
            .catch(error => {
                res.send({ success: false, status: 500, message: error.message })
            })
    }
}

module.exports = { login, addUser, getAllUser, getSingle, updateUser, updatestatus }
