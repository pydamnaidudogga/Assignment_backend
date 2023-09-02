const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');
const checkAuthentication =  require('../middilewares/auth');
const dataController = require('../controllers/data_controller')
const verify = require('../middilewares/userVerify');


// this route is for the google authentication
router.get('/auth/google',passport.authenticate('google', { scope: ['profile'] }))

//this is  google  callback route
router.get('/auth/google/callback',passport.authenticate('google'),usersController.createSession);

router.post('/users/verify',verify.Auth);

router.get('/users/logout',checkAuthentication.Auth,usersController.destroySession)
// this route is for geting quotes form the source
router.get('/quotes',checkAuthentication.Auth,dataController.quotes);

// this route is for geting average from the source
router.get('/average',checkAuthentication.Auth,dataController.average);

// this route is for geting slippage from the source
router.get('/slippage',checkAuthentication.Auth,dataController.slippage);








module.exports = router;