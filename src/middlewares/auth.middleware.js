const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const passport = require('passport')

const jwtSecret = require('../../config').api.jwtSecret
const { findUserById } = require('../users/users.controllers')

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: jwtSecret
}

passport.use(
    new JwtStrategy(options, (tokenDecoded, done) => {
        findUserById(tokenDecoded.id)
            .then((user) => {
                if(user){
                    done(null, tokenDecoded) 
                } else {
                    done(null, false) 
                }
            })
            .catch((err) => {
                done(err, false) 
            })
    })
)

module.exports = passport
