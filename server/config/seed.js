const User = require('../Apis/User/UserModel')
const bcrypt = require('bcrypt')


;(
async () => {
    try{
        await User.findOne({ Email: "admin@gmail.com" }).then( async (data) => {
        if (data == null) {
            let admin = await User.create({
                Username: 'Admin',
                Password: bcrypt.hashSync('123', 10),
                Email: 'admin@gmail.com',
                UserType: '1'
            })
           await admin.save().then((result) => {
                console.log('Admin Created');
            }).catch(err => {
                console.log('Error In Admin Creation', err);
            })
        } else {
            console.log("Admin already Exists");
        }
    }).catch((err) => {
        console.log("Error in admin ", err.message);
    })
    }
    
    catch{
        console.log('Something is wromg');
    }
    
    
}

)();
