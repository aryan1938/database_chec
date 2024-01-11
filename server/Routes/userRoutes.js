const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const multer = require('multer')

const postController = require('../Apis/Post/PostController')
const userController = require('../Apis/User/UserController')
const threadController = require('../Apis/Thread/ThreadController')
const replyController = require('../Apis/Reply/ReplyController')
const categoryController = require('../Apis/Category/CategoryController')

// Login
router.post("/login", userController.login)

// User
// User

let userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/public/user')
    },
    filename: (req, file, cb) => {
        let picname = Date.now() + file.originalname
        req.body.ProfilePicture = 'user/' + picname
        cb(null, picname)
    }
})
const uploadUser = multer({ storage: userStorage })

router.post("/add",uploadUser.single('ProfilePicture'),userController.addUser)

// Thread
router.post("/all/thread", threadController.getAll)
router.post("/single/thread", threadController.getSingle)

// Post
router.post("/all/post", postController.allPost)
router.post("/single/post", postController.singlePost)

// Category
router.post("/all/category", categoryController.getall)
router.post("/single/category", categoryController.getsingle)

// Reply
router.post("/all/reply", replyController.getAll)
router.post("/single/reply", replyController.getSingle)

// Checker
router.use(require('../middleware/tokenChecker'));

// User
router.post("/user/update", uploadUser.single('ProfilePicture'), userController.updateUser)

// Thread
router.post("/add/thread", threadController.addThread)
router.post("/update/thread", threadController.updateThread)
router.post("/updatestatus/thread", threadController.updateThreadStatus)

// Reply
router.post("/add/reply", replyController.addReply)
router.post("/update/reply", replyController.updateReply)
router.post("/updatestatus/reply", replyController.updatestatusReply)

// Post
let postStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/public/post')
    },
    filename: (req, file, cb) => {
        let picname = Date.now() + file.originalname
        req.body.Images = 'post/' + picname
        cb(null, picname)
    }
})
const uploadPost = multer({ storage: postStorage })
router.post("/add/post", uploadPost.single("Images"), postController.addPost)
router.post("/update/post", uploadPost.single("Images"), postController.updatePost)
router.post("/updatestatus/post", postController.updateStatusPost)

// Category
// router.post("/add/category", categoryController.addcategory)
// router.post("/update/category", categoryController.updatecategory)
// router.post("/updatestatus/category", categoryController.changestatus)

// All
router.post("*", (req, res) => {
    res.send({ success: false, status: 404, data: '404 Not found' })
})
router.get("*", (req, res) => {
    res.send("404 Error")
})



module.exports = router
