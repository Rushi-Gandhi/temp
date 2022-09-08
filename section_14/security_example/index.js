const path = require('path');
const helmet = require('helmet');
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');

const {Strategy} = require('passport-google-oauth20');
require('dotenv').config();

//save the session to the cookie
passport.serializeUser((user,done)=>{
    done(null , user.id);
});

// read the session from the cookie
passport.deserializeUser((id,done)=>{
    done(null,id);
});

const app = express();

const config = {
    CLIENT_ID : process.env.CLIENT_ID,
    CLIENT_SECRET : process.env.CLIENT_SECRET,
    COOKIE_KEY_1 : process.env.COOKIE_KEY_1,
    COOKIE_KEY_2 : process.env.COOKIE_KEY_2
}

const AUTH_OPTIONS = {
    callbackURL : '/auth/google/callback',
    clientID : config.CLIENT_ID,
    clientSecret : config.CLIENT_SECRET
}

function verifyCallback(accessToken , refreshToken , profile , done){
//console.log(profile);
done(null,profile);
}

passport.use(new Strategy(AUTH_OPTIONS ,verifyCallback));
app.use(helmet());
app.use(cookieSession({
    name :'session',
    maxAge : 24 * 60 * 60 * 1000,
    keys : [ config.COOKIE_KEY_1,config.COOKIE_KEY_1]
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});
//Google login required apis

function checkLogIn(req ,res , next){
    // console.log(req.isAuthenticated());
    // console.log(req.user);

    const isLogin = req.isAuthenticated() && req.user ;
    if(!isLogin)
    {
        return res.status(401).json({error : 'you must login !'});
    }
    next();

}
app.get('/auth/google' ,passport.authenticate('google', {
    scope : ['email']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect : '/failure',
    successRedirect : '/',
    session : true
   } ), (req ,res) => {
    //res.redirect();
    console.log('google callback');
});

app.get('/auth/logout' , (req,res)=>{
    // remove req.user and clears amy logged in session
    req.logout();
    res.redirect('/');
});

app.get('/failure' , (req,res)=>{
    return res.send('fail to login :( ')
});


app.get('/secret', checkLogIn,(req, res) => {
    res.send('777')
    //res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

module.exports = app