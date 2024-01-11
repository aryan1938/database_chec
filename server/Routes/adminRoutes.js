const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const userController = require('../Apis/User/UserController')
const threadController = require('../Apis/Thread/ThreadController')
const replyController = require('../Apis/Reply/ReplyController')
const postController = require('../Apis/Post/PostController')
const categoryController = require('../Apis/Category/CategoryController')
const subcategoryController = require('../Apis/subcategory/subcategorycontroller')

// Login
router.post("/login", userController.login)

// SubCategory
router.post("/single/subcategory", subcategoryController.getsiinglecategory)
router.post("/all/subcategory", subcategoryController.getallsubcategory)


// Thread
router.post("/all/thread", threadController.getAll)
router.post("/single/thread", threadController.getSingle)

// Reply
router.post("/all/reply", replyController.getAll)
router.post("/single/reply", replyController.getSingle)

// Post
router.post("/all/post", postController.allPost)
router.post("/single/post", postController.singlePost)

// Category
router.post("/all/category", categoryController.getall)
router.post("/single/category", categoryController.getsingle)

// Checker

router.use(require('../middleware/tokenChecker'))

// User
router.post("/alluser", userController.getAllUser)
router.post("/single", userController.getSingle)
// router.post("/update", userController.updateUser)
router.post("/status", userController.updatestatus)

// Thread
router.post("/add/thread", threadController.addThread)
router.post("/update/thread", threadController.updateThread)
router.post("/updatestatus/thread", threadController.updateThreadStatus)

// Reply
router.post("/add/reply", replyController.addReply)
router.post("/update/reply", replyController.updateReply)
router.post("/updatestatus/reply", replyController.updatestatusReply)

// Post
router.post("/add/post", postController.addPost)
router.post("/update/post", postController.updatePost)
router.post("/updatestatus/post", postController.updateStatusPost)

// Category
router.post("/add/category", categoryController.addcategory)
router.post("/update/category", categoryController.updatecategory)
router.post("/updatestatus/category", categoryController.changestatus)

// SubCategory
router.post("/add/subcategory", subcategoryController.addsubCategory)
// router.post("/all/subcategory", subcategoryController.getallsubcategory)
// router.post("/single/subcategory", subcategoryController.getsiinglecategory)
router.post("/update/subcategory", subcategoryController.updatesubcategory)

// All
router.post("*", (req,res)=>{
    res.send({success:false, status:404, data:'404 Not found'})
})


module.exports = router
