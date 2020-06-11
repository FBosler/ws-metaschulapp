const conf = require("../config/config");

import bcrypt from "bcryptjs"
import passport from "passport"
import _ from "lodash"
import chalk from "chalk"

import { Strategy as LocalStrategy} from "passport-local"
import { Strategy as GoogleStrategy} from "passport-google-oauth20"
import { Strategy as FacebookStrategy} from "passport-facebook"

import User  from "../models/User";
import credentials from "./credentials"

const generateCallbackURL = (provider) => {
    return `${conf.FRONT_END_URL}/api/auth/${provider}/callback`
}

const findByEmailOrCreate = (email, req, profile, done) => {
    const rawReferredBy = req.query.state || req.session.state;
    let referredBy = ""
    try {
        referredBy = _.isEmpty(req.query) || _.isEmpty(rawReferredBy) ? "" : JSON.parse(rawReferredBy.replace(/&#34;/g, '"')).referralCode;
    } catch(err) {
        console.log("in find email or create", rawReferredBy)
    }
    const name = profile.displayName || profile.username || profile.display_name;

    User.findOne({ email: email }).then((user) => {
        if (!user) {
            const newUser = new User({
                name,
                email,
                emailIsVerified: true,
                referredBy: referredBy,
                thirdPartyAuth: [
                    {
                        providerName: profile.provider,
                        providerId: profile.id,
                        providerData: profile,
                    },
                ],
            });
            newUser
                .save()
                .then((user) => {
                    return done(null, user);
                })
                .catch((err) => {
                    return done(null, false);
                });
        } else {
            // ToDo: Check for thirdPartyAuth if we already have a entry
            // in our thirdPartyAuth array, if not push into it
            return done(null, user);
        }
    });
};

// Local Strategy
passport.use(
    new LocalStrategy({ usernameField: "email", session: false }, (email, password, done) => {
        console.log(chalk.red.bold("Called:"), chalk.bold.bgBlue.white("LocalStrategy"));
        // Match User
        User.findOne({ email: email })
            .then((user) => {
                // Create new User
                if (!user) {
                    const newUser = new User({ email, password });
                    // Hash password before saving in database
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then((user) => {
                                    return done(null, user);
                                })
                                .catch((err) => {
                                    return done(null, false, { message: err });
                                });
                        });
                    });
                    // Return other user
                } else {
                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Wrong password" });
                        }
                    });
                }
            })
            .catch((err) => {
                return done(null, false, { message: err });
            });
    })
);

// Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: credentials.GOOGLE.client_id,
            clientSecret: credentials.GOOGLE.client_secret,
            callbackURL: generateCallbackURL('google'),
            passReqToCallback: true
        },
        (req, accessToken, refreshToken, profile, done) => {
            const email = profile.emails.filter((email) => email.verified)[0].value;
            findByEmailOrCreate(email, req, profile, done);
        }
    )
);

// Facebook Strategy
passport.use(
    new FacebookStrategy(
        {
            clientID: credentials.FACEBOOK.client_id,
            clientSecret: credentials.FACEBOOK.client_secret,
            callbackURL: generateCallbackURL('facebook'),
            passReqToCallback: true,
            profileFields: [
                "id",
                "email",
                "gender",
                "link",
                "locale",
                "name",
                "displayName",
                "timezone",
                "updated_time",
                "verified",
            ],
        },
        function (req, accessToken, refreshToken, profile, done) {
            const email = profile.emails[0].value;
            findByEmailOrCreate(email, req, profile, done);
        }
    )
);

export default passport
