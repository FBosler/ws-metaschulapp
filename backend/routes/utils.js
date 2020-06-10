const conf = require("../config/config");

import User from "../models/User";
import jwt from "jsonwebtoken";

const ensureLoggedIn = (req, res) => {
    const userId = req.user.id;

    if (!userId) {
        res.status(401).json({ data: {}, errors: "Not logged in" });
        return false
    }
    return true
};

const extractUserFromJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    jwt.verify(token, conf.JWT_SECRET, function (err, decoded) {
        if (err) {
            req.user = Object.create(null);
        } else {
            req.user = decoded.user;
        }
    });
    next();
};

const isRole = (req, roles) => {
    const usedRoles = Array.isArray(roles) ? roles : [roles];
    if (
        req &&
        req.user &&
        req.user.permissions &&
        req.user.permissions.role &&
        usedRoles.includes(req.user.permissions.role)
    ) {
        return true;
    } else {
        return false;
    }
};

const signToken = (user) => {
    const userData = new User(user);
    return jwt.sign({ user: userData.tokenInfo() }, process.env.JWT_SECRET, {
        expiresIn: 604800,
    });
};

const deepUpdate = (original, keys, value) => {
    //  updates original object, creates new entries if not exist
    //  const a = {hi:{bye:3},second:3} -> deepUpdate(a, ['hi','ciao','bird'], 3) -> {hi:{bye:3},second:3,ciao:{bird:3}}
    if (keys.length === 0) {
        return value;
    }
    const currentKey = keys[0];
    if (Array.isArray(original)) {
        return original.map((v, index) => (index === currentKey ? deepUpdate(v, keys.slice(1), value) : v));
    } else if (typeof original === "object" && original !== null) {
        if (keys.length === 1) {
            original[currentKey] = value;
        }
        if (!Object.keys(original).includes(currentKey)) {
            original[currentKey] = {};
        }
        return Object.fromEntries(
            Object.entries(original).map((keyValuePair) => {
                const [k, v] = keyValuePair;
                if (k === currentKey) {
                    return [k, deepUpdate(v, keys.slice(1), value)];
                } else {
                    return keyValuePair;
                }
            })
        );
    } else {
        // Primitive value
        return original;
    }
};

export { signToken, isRole, extractUserFromJWT, deepUpdate, ensureLoggedIn };
