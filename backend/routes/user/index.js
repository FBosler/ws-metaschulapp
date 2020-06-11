const conf = require("../../config/config");

import express from "express";
import chalk from "chalk";
import _ from "lodash";

import { isRole, signToken } from "../utils";
import User from "../../models/User";
import { ensureLoggedIn } from "../utils";
import { to } from "await-to-js";

const router = express.Router();

router.get("/logout", (req, res) => {
    if (req.user) {
        const userName = req.user.name;
        delete req.user;
        return res
            .status(200)
            .clearCookie("jwt", { domain: conf.DOMAIN })
            .json({ success: `logged out ${userName}` });
    } else {
        return res
            .status(200)
            .clearCookie("jwt", { domain: conf.DOMAIN })
            .json({ success: "No user to log out found" });
    }
});

router.get("/delete", (req, res) => {
    if (req.user) {
        User.deleteOne({ _id: req.user.id }, (err) => {
            if (!err) {
                const user_id = req.user.id;
                req.logout();
                return res.status(200).json({ success: `deleted ${user_id}` });
            } else {
                console.log(err);
            }
        });
    } else {
        return res.status(200).json({ success: "No user to delete found" });
    }
});

router.get("/me", (req, res) => {
    console.log(chalk.red.bold("Called:"), chalk.bold.bgBlue.white("me"));
    if (!req.user) {
        // ToDo or send errors back
        console.log(chalk.blue("Fetching own profile: No user found"));
        res.status(200).json({ errors: "No user found" });
    } else {
        User.findById(req.user.id).then((user) => {
            console.log(chalk.blue("Fetching own profile: Trying to find user"));
            if (!user) {
                console.log(chalk.blue("Fetching own profile: No user found via id"));
                res.status(400).json({ errors: `User with the id: ${req.user.id} not found` });
            } else {
                console.log(chalk.blue("Fetching own profile: User found"));
                res.status(200).json(user.public());
                // User.find({ referred_by: user.referral_code }).then((data) => {
                //     const returnUser = user.public()
                //     returnUser.referrals = data.length;
                //     res.status(200).json(returnUser);
                // });
            }
        });
    }
});

router.get("/fetch_unassigned_user", (req, res) => {
    if (isRole(req, "admin")) {
        User.find({ _id: { $ne: req.user.id }, assignedTo: { $ne: req.user.id } }, "_id email name").then((users) => {
            if (users) {
                res.status(200).json({ users, errors: "" });
            } else {
                res.status(200).json({ errors: "No users unassigned" });
            }
        });
    }
});

router.post("/assign", (req, res) => {
    if (isRole(req, "admin")) {
        console.log("in admin",req.body);
        const { toBeAssigned, assignedTo } = req.body;
        User.findById(toBeAssigned).then((user) => {
            if (!user) {
                console.log(chalk.red(`User with the id: ${toBeAssigned} not found`));
                res.status(200).json({ errors: `User with the id: ${toBeAssigned} not found` });
            } else {
                if (user.assignedTo.indexOf(assignedTo) === -1) {
                    user.assignedTo.push(assignedTo);
                }
                user.save()
                    .then(() => {
                        res.status(200).json({ assignedUser: user._id });
                    })
                    .catch((err) => {
                        res.status(400).json({ errors: err });
                    });
            }
        });
    }
});

const updateUser = (updates, user) => {
    const acceptedUpdates = ["phoneNumber", "name", "email", "permissions", "classification"];
    acceptedUpdates.forEach((updateField) => {
        if (updates[updateField]) {
            user[updateField] = updates[updateField];
        }
    });

    console.log("updates", updates);

    // here deep update based on values in updates
};

router.post("/update", (req, res) => {
    console.log(chalk.blue("went into update"));
    if (!req.user) {
        // ToDo or send errors back
        res.status(200).json({ errors: "Not logged in" });
    } else {
        const id = req.user.id;

        User.findById(id).then((user) => {
            if (!user) {
                console.log(chalk.red(`User with the id: ${id} not found`));
                res.status(200).json({ errors: `User with the id: ${id} not found` });
            } else {
                updateUser(req.body, user);
                user.save()
                    .then(() => {
                        const token = signToken(user);
                        res.status(200)
                            .cookie("jwt", token, { httpOnly: true, domain: conf.DOMAIN })
                            .json(user.public());
                    })
                    .catch((err) => {
                        console.log("in user update", err);
                    });
            }
        });
    }
});

router.get("/confirm/:id", (req, res) => {
    const id = req.params.id;
    const register_login = "/register_login";
    User.findById(id).then((user) => {
        if (!user) {
            console.log(chalk.red(`User with the id: ${id} not found`));
            res.redirect(register_login);
        } else {
            user.email_is_verified = true;
            user.save()
                .then(() => {
                    res.redirect(register_login);
                })
                .catch((err) => {
                    console.log("in confirm id", err);
                });
        }
    });
});

router.get("/:_id", async (req, res) => {
    console.log('in fetching userhere')
    if (ensureLoggedIn(req, res)) {
        const _id = req.params._id;
        const [err, user] = await to(User.findById(_id));
        if (err) {
            res.status(400).json({ data: {}, errors: err });
        } else {
            res.status(200).json({ data: user.public(), errors: "" });
        }
    }
});

export default router;
