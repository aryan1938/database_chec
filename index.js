const express = require('express')
const app = express()
const seed = require('./server/config/seed')
const mongoose = require('mongoose')
var cors = require('cors')
var path = require('path')
app.use(cors())

const connectdb = require('./server/config/db.js')
connectdb()

// ==> uncomment w=hen run on server

app.use(express.urlencoded({ extended: false, limit: '50mb', parameterLimit: 30000000 }))
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname,'/server/public')));




const adminRoutes = require("./server/Routes/adminRoutes")
const userRoutes = require("./server/Routes/userRoutes")
const exp = require('constants')

app.use("/user", userRoutes)
app.use("/admin", adminRoutes)

app.get("/",(req,res)=>{
  ;( async () => {
    try{
        await mongoose.connect(`mongodb://movie:123@ac-ibr9yjj-shard-00-00.kksbnxt.mongodb.net:27017,ac-ibr9yjj-shard-00-01.kksbnxt.mongodb.net:27017,ac-ibr9yjj-shard-00-02.kksbnxt.mongodb.net:27017/?replicaSet=atlas-dw2o0p-shard-0&ssl=true&authSource=admin` , {
            dbName:"dark_forums"
        });
        console.log("Database Connected Successfully!!! ");
    }catch(err){
        console.log("Can't Connect to DB : "  ,err);
    }
})()
  res.render("home.ejs")
})

  
  app.listen(5000, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("server is running");
    }
  })
  