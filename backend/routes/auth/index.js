const conf = require("../../config/config");

import express from "express"

import passport from "passport"
import chalk from "chalk"
import {signToken} from "../utils"

const providerScopes = {
    google: { scope: ["profile", "email"] },
    facebook: { scope: ["email"] },
    amazon: { scope: ["profile"] },
    github: {},
    twitter: {},
    spotify: { scope: ["user-read-email"] },
    twitch: { scope: ["user:read:email"] },
};

const router = express.Router();

router.post("/register_login", (req, res, next) => {
    console.log(chalk.red.bold("Called:"), chalk.bold.bgBlue.white('/register_login'));
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            console.log(chalk.red(err));
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            console.log(chalk.red(err));
            return res.status(400).json({ errors: "No user found" });
        }
        req.logIn(user, { session: false }, function (err) {
            if (err) {
                console.log(chalk.red(err));
                return res.status(400).json({ errors: err });
            }
            const token = signToken(user);
            return res
                .status(200)
                .cookie("jwt", token, { httpOnly: true, domain: conf.DOMAIN })
                .json({ data: user.id, errors: "" });
        });
    })(req, res, next);
});

// auth routers
router.get("/:provider", (req, res, next) => {
    console.log(chalk.red.bold("Called:"), chalk.bold.bgBlue.white(':provider'));
    const provider = req.params.provider;
    const scope = providerScopes[provider];
    const state = { state: JSON.stringify(req.query), session:false };
    const options = { ...state, ...scope };
    if (provider === "twitter") {
        req.session.state = JSON.stringify(req.query);
    }
    passport.authenticate(provider, options)(req, res, next);
});

// callbacks
router.get(
    "/:provider/callback",
    (req, res, next) => {
        passport.authenticate(req.params.provider, {session:false})(req, res, next);
    },
    (req, res) => {
        console.log(chalk.red.bold("Called:"), chalk.bold.bgBlue.white(':provider/callback'));

        return res
            .status(200)
            .cookie("jwt", signToken(req.user), {
                httpOnly: true,
                domain: conf.DOMAIN
            })
            .redirect(`${conf.FRONT_END_URL}/profile`);
    }
);

export default router;
