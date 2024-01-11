const mongoose = require('mongoose')

// import mongoose from "mongoose";

const db = async () => {
    try{
        await mongoose.connect(`mongodb://hacker:123@ac-zisgheu-shard-00-00.nguq63o.mongodb.net:27017,ac-zisgheu-shard-00-01.nguq63o.mongodb.net:27017,ac-zisgheu-shard-00-02.nguq63o.mongodb.net:27017/?ssl=true&replicaSet=atlas-po1wpv-shard-0&authSource=admin&retryWrites=true&w=majority` , {
            dbName:"dark_forums"
        });
        console.log("Database Connected Successfully!!! ");
    }catch(err){
        console.log("Can't Connect to DB : "  ,err);
    }
};

// export default db ;
module.exports = db;




//     console.log("database connected");
// }).catch((err) => {
//     console.log("Eror in Dattaase", err);
// })


