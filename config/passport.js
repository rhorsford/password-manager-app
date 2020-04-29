const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Record = mongoose.model("records");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
              if (user) {
                return done(null, user);
              }
              return done(null, false);
            })
            .catch(err => console.log(err));
      })
  );
  //
  // passport.use(
  //     new JwtStrategy(opts, (jwt_payload, done) => {
  //       Record.findById(jwt_payload.id)
  //           .then(record => {
  //             if (record) {
  //               return done(null, record);
  //             }
  //             return done(null, false);
  //           })
  //           .catch(err => console.log(err));
  //     })
  // );
};