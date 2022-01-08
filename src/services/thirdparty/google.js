const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.serializeUser(function(user,done){
    done(null,user)
})

passport.deserializeUser(function(user,done){
    done(null,user)
})

passport.use(
    'google',
    new GoogleStrategy(
        {
            clientID: '221533455879-sbuu0corh4nhm2ci9o8i8rirta4oj6iu.apps.googleusercontent.com',
            clientSecret: 'Ad12d0_EQQKse3-3JjJ-xbj1',
            callbackURL: '/user/login/google/callback'
        },
        function(accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    ),
);

module.exports = passport