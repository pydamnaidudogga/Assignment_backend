const  jwt = require('jsonwebtoken');
const User = require('../models/user');
// const  ENV = require('../../config');

// This is the JWT middleware to check the athentication
module.exports.Auth = async (req, res)=>{
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
 
       return res.status(200).json({
        user:{
            name:verifyUser.displayName     
        }
       })
        
    } catch (error) {
        res.status(401).json({erroe: "Authentication Faild"});
        
    }
}