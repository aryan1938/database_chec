const reply = require('./ReplyModel')

const addReply = async (req, res) => {
    let validation = ''
    if (!req.body.Content) {
        validation += 'Content is required'
    }
    if (!req.body.UserID) {
        validation += 'UserID is required'
    }
    if (!req.body.PostID) {
        validation += 'PostID is required'
    }
    if (!!validation) {
        res.json({ success: false, status: 300, message: validation })
    }

    else {
        let totalReply = await reply.countDocuments()
        let newReply = new reply({
            ReplyID: totalReply + 1,
            Content: req.body.Content,
            UserID: req.body.UserID,
            PostID: req.body.PostID
        })

        newReply.save().then(result => {
            res.json({ success: true, status: 200, data: result, message: "new reply added successfully" })
        }).catch(error => {
            res.json({ success: false, status: 400, message: error.message })
        })
    }
}

const getAll = (req, res) => {
    reply.find().populate('UserID').then(result => {
        res.json({ success: true, status: 200, data: result, message: 'all reply loaded' })
    }).catch(error => {
        res.json({ success: false, status: 400, message: error.message })
    })
}

const getSingle = (req, res) => {
    let validation = ''
    if (!req.body._id) {
        validation += '_id is required'
    }
    if (!!validation) {
        res.json({ success: false, status: 500, message: validation })
    }
    else {
        reply.findOne({_id:req.body._id}).populate('UserID').then(result => {
            if (result == null) {
                res.json({ success: false, status: 400, message: 'reply not found' })
            }
            else {
                res.json({ success: true, status: 200, data: result, message: 'single reply loaded' })
            }
        }).catch(error => {
            res.json({ success: false, status: 400, message: error.message })
        })
    }
}

const updateReply = (req,res)=>{
    let validation = ''
    if (!req.body._id)
        validation += "_id is require"
    if (!!validation)
        res.send({ success: false, status: 500, message: validation })

    else {
        reply.findOne({ _id: req.body._id })
            .then(async result => {
                if (result == null) {
                    res.send({ success: false, status: 500, message: 'No reply Found' })
                }
                else {
                    if (!!req.body.Content) {
                        result.Content = req.body.Content
                    }
                    if (!!req.body.UserID) {
                        result.UserID = req.body.UserID
                    }
                    if (!!req.body.PostID) {
                        result.PostID = req.body.PostID
                    }

                    result.save()
                        .then(updateReply => {
                            res.send({ success: 200, status: true, data: updateReply, message:'reply updated successfully' })
                        })
                        .catch(error => {
                            res.send({ success: 500, status: false, message: error.message })
                        })
                }
            })

            .catch(error => {
                res.send({ success: false, status: 500, message: error.message })
            })
    }
}

const updatestatusReply = (req,res)=>{
    let validation = ''
    if (!req.body._id)
        validation += "_id is require"
    if (!!validation)
        res.send({ success: false, status: 500, message: validation })

    else {
        reply.findOne({ _id: req.body._id })
            .then(async result => {
                if (result == null) {
                    res.send({ success: false, status: 500, message: 'No reply Found' })
                }
                else {
                    if (!!req.body.Status) {
                        result.Status = req.body.Status
                    }
                    result.save()
                        .then(updatestatusReply => {
                            res.send({ success: 200, status: true, data: updatestatusReply, message:'reply updated successfully' })
                        })
                        .catch(error => {
                            res.send({ success: 500, status: false, message: error.message })
                        })
                }
            })

            .catch(error => {
                res.send({ success: false, status: 500, message: error.message })
            })
    }
}

module.exports = { addReply, getAll, getSingle, updateReply, updatestatusReply }