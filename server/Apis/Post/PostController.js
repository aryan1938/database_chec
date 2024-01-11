const post = require('./PostModel')
const fs = require('fs')

const addPost = async (req, res) => {
    let validation = ''
    if (!req.body.Content) {
        validation += 'content is required'
    }
    if (!req.body.Images) {
        validation += 'Images is required'
    }
    if (!req.body.UserID) {
        validation += 'userid is required'
    }
    if (!req.body.ThreadID) {
        validation += 'threadid is required'
    }
    if (!!validation) {
        res.json({ success: false, status: 400, data: validation })
    }

    else {
        let totalPost = await post.countDocuments()
        let newPost = new post({
            PostID: totalPost + 1,
            Images: req.body.Images,
            Content: req.body.Content,
            UserID: req.body.UserID,
            ThreadID: req.body.ThreadID
        })

        newPost.save().then(result => {
            res.json({ success: true, status: 200, data: result, message: "new post added successfully" })
        }).catch(error => {
            res.json({ success: false, status: 400, message: error })
        })
    }
}

const allPost = (req, res) => {
    post.find().then(result => {
        res.json({ success: true, status: 200, data: result, message: 'all post loaded successfully' })
    }).catch(error => {
        res.json({ success: false, status: 400, message: error.message })
    })
}

const singlePost = (req, res) => {
    let validation = ''

    if (!req.body._id) {
        validation += '_id is require'
    }
    if (!!validation) {
        res.json({ success: false, status: 300, message: validation })
    }
    else {
        post.findOne({ _id: req.body._id }).then(result => {
            if (result == null) {
                res.json({ success: false, status: 400, message: 'post not found' })
            } else {
                res.json({ success: true, status: 200, data: result, message: 'all post loaded successfully' })
            }
        }).catch(error => {
            res.json({ success: false, status: 400, message: error.message })
        })
    }
}

const updatePost = (req, res) => {
    let validation = ''
    if (!req.body._id)
        validation += "_id is require"
    if (!!validation)
        res.send({ success: false, status: 500, message: validation })

    else {
        post.findOne({ _id: req.body._id })
            .then(async result => {
                if (result == null) {
                    res.send({ success: false, status: 500, message: 'No reply Found' })
                }
                else {
                    if (!!req.body.Content) {
                        result.Content = req.body.Content
                    }
                    if (!!req.body.Images) {
                        fs.unlinkSync('server/public/'+result.Images)
                        result.Images = req.body.Images
                    }
                    if (!!req.body.UserID) {
                        result.UserID = req.body.UserID
                    }
                    if (!!req.body.ThreadID) {
                        result.ThreadID = req.body.ThreadID
                    }

                    result.save()
                        .then(updateReply => {
                            res.send({ success: 200, status: true, data: updateReply, message: 'post updated successfully' })
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

const updateStatusPost = (req, res) => {
    let validation = ''
    if (!req.body._id)
        validation += "_id is require"
    if (!!validation)
        res.send({ success: false, status: 500, message: validation })

    else {
        post.findOne({ _id: req.body._id })
            .then(async result => {
                if (result == null) {
                    res.send({ success: false, status: 500, message: 'No reply Found' })
                }
                else {
                    if (!!req.body.Status) {
                        result.Status = req.body.Status
                    }

                    result.save()
                        .then(updatepost => {
                            res.send({ success: 200, status: true, data: updatepost, message: 'post status updated successfully' })
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


module.exports = { addPost, allPost, singlePost, updatePost , updateStatusPost}