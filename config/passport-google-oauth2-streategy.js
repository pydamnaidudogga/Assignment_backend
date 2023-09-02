const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

// tell passport to use a new strategy for google login

// Initialize Passport
passport.use(new GoogleStrategy({
    clientID: '641884596744-gfogn1bba0akf6fnl4o3mrmq78at92um.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/auth/google/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {

      let user = await User.findOne({ googleId: profile.id });
    
      
      if (!user) {
        user = new User({
          googleId: profile.id,
          displayName: profile.displayName,
          // Set other necessary fields
        });
       await user.save();
       return  done(null, user);
      } else {
        return done(null, user);
      }


      
    } catch (error) {
      return done(error, null); // Pass err as the error object
      
    }
    

  }));

  //   serializing the user to decide which key is to  be kept in the cookies
  passport.serializeUser(function(user, done){
    done(null,user.id);
 });

//  deserializing the user from the key in the cookies
  passport.deserializeUser( async (id,done)=>{
    try {
      let user = await User.findById(id);
      return done(null,user);
      
    } catch (error) {
      return done(error);
      
      
    }
   
    
  });

   // check if user is authenticated
  passport.checkAuthentication = function(req,res, next){
    // if the user is signed in
    
     if(req.isAuthenticated()){
          return next();
     }
    //   if the user is not signed in
     return res.redirect('/auth/google');
  }

module.exports = passport;