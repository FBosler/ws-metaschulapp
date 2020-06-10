const conf = require("../../config/config");

import express from "express";
import _ from "lodash";
import { to } from "await-to-js";

import { isRole, signToken } from "../utils";
import App from "../../models/App";
import { ensureLoggedIn } from "../utils";

const router = express.Router();

router.get("/:_id", async (req, res) => {
    if (ensureLoggedIn(req, res)) {
        const _id = req.params._id;

        console.log("fetching");

        if (_id === "all") {
            const [err, allApps] = await to(
                App.find({}, { _id: 1, useCase: 1, name: 1, schoolTypes: 1, classes: 1, subjects: 1 })
            );
            if (err) {
                res.status(400).json({ data: {}, errors: err });
            } else {
                res.status(200).json({ data: allApps, errors: "" });
            }
        } else {
            const [err, app] = await to(App.findById(_id));
            if (err) {
                res.status(400).json({ data: {}, errors: err });
            } else {
                res.status(200).json({ data: app, errors: "" });
            }
        }
    }
});

export default router;
