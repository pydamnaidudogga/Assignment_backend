// const  jwt = require('jsonwebtoken');
// const  ENV = require('../../config');
const User = require('../models/user');

// This is the JWT middleware to check the athentication
// module.exports.Auth = async (req, res, next)=>{
//     try {
        
//     //    extracting the token from the headers
//        const token = req.headers.authorization;

//     //  checking the token with JWT secrect 
//        const decodedToken =  await jwt.verify(token, 'same');

//     //    attach the user to request
//        req.user = decodedToken;
 
//        next();
        
//     } catch (error) {
//         res.status(401).json({erroe: "Authentication Faild"});
        
//     }
// }


// This is the JWT middleware to check the athentication
module.exports.Auth = async (req, res, next)=>{
    try {
       
    
    if(req.session.passport.user === undefined){
       
        return res.status(400).json({
            message:'authentication faild'
        })
    }
   
    const id=req.session.passport.user;
   
    const verifyUser = await User.findById(id);
   
    if(!verifyUser){
        return res.status(400).json({
            message:'authentication faild'
        })
    }
      

     next();
        
    } catch (error) {
        console.error(error);
        res.status(401).json({erroe: "Authentication Faild"});
        
    }
}