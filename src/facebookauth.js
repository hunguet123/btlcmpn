const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const FACEBOOK_APP_ID = '698911214579105';
const FACEBOOK_APP_SECRET = 'd04f739463d1263a62441548847935a3';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email'],
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));

passport.serializeUser(function(user, done) {
    done(null, user);
  })
  
  passport.deserializeUser(function(user, done) {
      done(null, user);
  });