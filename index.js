const express = require('express');
var cors = require('cors');
const app = express();

const session = require('express-session');
const port = 8000;
const db = require('./config/mongoose');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const passportGoogle = require('./config/passport-google-oauth2-streategy');

app.use(express.json()); // Parse JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));

// mongo store is used to store the session cookie in the db
app.use(session({
  name : 'sessionKey',
  // TODO change the secret before deploy
  secret:'blahsomething',
  saveUninitialized: false,
  resave: false,
  cookie: {
        maxAge: (1000 * 60 * 100)
  },
  store: MongoStore.create({
        mongoUrl:'mongodb+srv://pydamnaidu:cam29YlaSK3cRHqa@assignment.cjh6ckr.mongodb.net/?retryWrites=true&w=majority',
        autoRemove:'disabled'
  },
  function(err){
        console.log(err || 'connect-mogodb setup ok');
  }
  )
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: "http://localhost:3000",
  methods:'GET,POST,PUT,DELETE',
  credentials:true,
}));
app.use('/', require('./routes/index.js'));







app.listen(port,function(err){
    if(err){
      console.log(`Error in running the server : ${err}`)
    }else{
      console.log(`Surver is running on port :${port}`)
    }

});