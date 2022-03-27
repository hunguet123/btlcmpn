const express = require('express');
const passport = require('passport');
const handlebars = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const res = require('express/lib/response')
const req = require('express/lib/request')

const session = require('express-session');

require('./auth');
require('./facebookauth');

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const app = express();
const port = 5000;

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));

//template engine

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
    //res.send('<a href="/auth/google">Loggin with Google</a>');
    res.render('login');
  });

app.get('/protected', isLoggedIn, (req, res) => {
   //res.send('Hello ${req.user.displayName} <a href="/logout">Logout</a>');
    res.render('home');
});
  
app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.render('login');
});
  
app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }
));

app.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  })
);

app.get('/auth/facebook',
  passport.authenticate('facebook'));


  app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  })
);

app.get('/auth/failure', (req, res) => {
  res.send("somthing went wrong..");
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

