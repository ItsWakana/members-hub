const passport = require("passport");
const {
    signinAuthStrategy
} = require("../controllers/authController");
const User = require("../models/User");

passport.use(signinAuthStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  }
});

module.exports = passport;