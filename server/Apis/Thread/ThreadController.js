const thread = require('./ThreadModel')

const addThread = async (req, res) => {
    let validation = ''
    if (!req.body.Title) {
        validation += 'title is required'
    }
    if (!req.body.Content) {
        validation += 'content is required'
    }
    if (!req.body.UserID) {
        validation += 'userid is required'
    }
    if (!req.body.CategoryID) {
        validation += 'categoryid is required'
    }
    if (!!validation) {
        res.json({ success: false, status: 400, data: validation })
    }

    else {
        let totalThread = await thread.countDocuments()
        let newThread = new thread({
            ThreadID: totalThread + 1,
            Title: req.body.Title,
            Content: req.body.Content,
            UserID: req.body.UserID,
            CategoryID: req.body.CategoryID
        })

        newThread.save().then(result => {
            res.json({ success: true, status: 200, data: result, message: "new thread added successfully" })
        }).catch(error => {
            res.json({ success: false, status: 400, message: error })
        })
    }
}

const getAll = (req, res) => {
    thread.find().then(result => {
        res.json({ success: true, status: 200, data: result, message: "All thread loaded" })
    }).catch(error => {
        res.json({ success: false, status: 400, message: error.message })

    })
}

const getSingle = (req, res) => {
    let validation = ""

    if (!req.body._id) {
        validation += "_id is require"
    } else {
        thread.findOne({ _id: req.body._id }).then(result => {
            if (result == null)
                res.json({ success: false, status: 500, message: 'No thread Found' })

            else
                res.json({ success: true, status: 200, data: result, message: "Single thread loaded" })

        }).catch(error => {
            res.json({ success: false, status: 400, message: error.message })
        })
    }
}

const updateThread = (req, res) => {
    let validation = ''
    if (!req.body._id) {
        validation += "_id is required"
    }

    if (!!validation) {
        res.json({ success: false, status: 500, message: validation })
    }

    else {
        thread.findOne({ _id: req.body._id }).populate('UserID').then(async result => {
            if (result == null) {
                res.send({ success: false, status: 500, message: 'No Thread Found' })
            }
            else {
                if (!!req.body.Title) {
                    result.Title = req.body.Title
                }
                if (!!req.body.Content) {
                    result.Content = req.body.Content
                }
                if (!!req.body.UserID) {
                    result.UserID = req.body.UserID
                }
                if (!!req.body.CategoryID) {
                    result.CategoryID = req.body.CategoryID
                }
                else {
                    result.save().then(updateThread => {
                        res.json({ success: 200, status: true, data: updateThread, message: "Thread successfully Updated" })
                    }).catch(error => {
                        res.json({ success: false, status: 500, message: error })
                    })
                }
            }
        })
    }
}

const updateThreadStatus = (req,res)=>{
    let validation = ''
    if (!req.body._id) {
        validation += "_id is required"
    }

    if (!!validation) {
        res.json({ success: false, status: 500, message: validation })
    }

    else {
        thread.findOne({ _id: req.body._id }).populate('UserID').then(async result => {
            if (result == null) {
                res.send({ success: false, status: 500, message: 'No thread Found' })
            }
            else {
                if (!!req.body.Status) {
                    result.Status = req.body.Status
                }
                    result.save().then(updateThread => {
                        res.json({ success: 200, status: true, data: updateThread, message: "Thread Status successfully Updated" })
                    }).catch(error => {
                        res.json({ success: false, status: 500, message: error.message })
                    })
            }
        })
    }
}


module.exports = { addThread, getAll, getSingle, updateThread , updateThreadStatus}