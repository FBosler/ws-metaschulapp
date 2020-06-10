const conf = require("./config/config");

import express from "express";
import cookieParser from "cookie-parser";
import http from "http";
import mongoose from "mongoose";
import passport from "./passport/setup";
import auth from "./routes/auth";
import user from "./routes/user";
import apps from "./routes/apps";
import { extractUserFromJWT } from "./routes/utils";

// const admin = require("./routes/admin");

const app = express();
const server = http.createServer(app);

const PORT = 5000;

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    connectTimeoutMS: 10000,
};

mongoose
    .connect(conf.MONGO_URL, mongoOptions)
    .then(console.log(`MongoDB connected ${conf.MONGO_URL}`))
    .catch((err) => console.log(err));

// Bodyparser middleware, extended false does not allow nested payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware to extract cookies from header
app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());

// Routes
app.use("/api/auth", extractUserFromJWT, auth);
app.use("/api/user", extractUserFromJWT, user);
app.use("/api/apps", extractUserFromJWT, apps);

server.listen(PORT, () => console.log(`Backend listening on port ${PORT}!`));