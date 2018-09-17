module.exports = function(passport) {

    const User = require('./models/user.js')

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    }); // if you are using sessions

    passport.deserializeUser(function(id, done) {
      User.findUserById(id, function(err, user) {
        done(err, user);
      });
    }); // if you are using sessions

    passport.use('local-login', new LocalStrategy({
      email : 'email',
      passwordField : 'password',
      passReqToCallback : true
   },
   function(req, email, password, done) { 
     User.findUserByEmail((email)
     function(err, user) {
       if (err) {
        return done(err);
        }
       if (!user){
        return done(null, false);
        }
       if (!User.checkPassword(password,user.password_digest)) {
         return done(null, false);
       }

       else
         return done(null, user); // all good return user
     });
   });
)};