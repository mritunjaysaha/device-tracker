const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/user.model");

const cookieExtractor = (req) => {
    let token = null;

    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
};

//JwtStrategy is used for authorization
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: cookieExtractor,
            secretOrKey: "mj",
        },
        (payload, done) => {
            User.findById({ _id: payload.sub }, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                }
            });
        }
    )
);

// LocalStrategy willbe triggered when we sign in to authenticate
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            user.comparePassword(password, done);
        });
    })
);
