const jwt = require('jsonwebtoken')
const secretKey= '##@$%^#%&#&$#%3635Ggwgy6#^#%^#&#&*#HY#%%#^#^&#'

module.exports = (req, res, next)=>{
    let token = req.headers['authorization']
    if(!!token)
    jwt.verify(token, secretKey, (err, data)=>{
        if(err)
        res.send({ success:false, status:300, message:'Unauthorized access'})
        else{
            req.decoded = data
            next()
        }
    })
    else
    res.send({success:false, status:400, message:"No token Found"})
}


