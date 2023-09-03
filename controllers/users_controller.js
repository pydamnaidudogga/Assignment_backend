const jwt = require('jsonwebtoken');
const User = require('../models/user');


// sign in and create a session for the user
module.exports.createSession = async function(req, res){
    try{
      // find the user in the database    
        let user = await User.findOne({googleId: req.user.googleId});
       
        // if the user not found in the databse then return
        if (!user){
            return res.json(422, {
                message: "Invalid user"
            });
        }
        const token = jwt.sign({
            userId: user._id,
            name : user.name
          },'same',{expiresIn : "24h"});
          
          // Redirect the user to the fornt end
          res.redirect(`https://doteyelabsassignment.netlify.app?token=${token}`);

    }catch(err){
        console.error('Error in creating the user', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}

module.exports.destroySession = function(req, res){

    try {
        req.logout((err) => {
            if (err) {
              // Handle any errors here
              console.error(err);
            }
            return res.status(200).json({
                message:'Logout success'
            })

        })
       
        
    } catch (error) {
        console.error('error in logout controller', error);
        return res.status(500).json({
            message : 'Internal server error'
        })
        
    }
    
   
}