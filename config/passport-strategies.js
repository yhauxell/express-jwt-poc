const passport = require("passport");
const config = require("./config");

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {
};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret-phrase";
//opts.issuer = "accounts.yhauxell.github.com";
//opts.audience = "yhauxell.github.com";
passport.use(
  new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    if (config.default.user == jwt_payload.sub) {
      return done(null, {
          username: config.default.user
      });
    }
    return done(null, true);
  })
);
