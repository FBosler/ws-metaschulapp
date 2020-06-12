const dotenv = require("dotenv");

if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: "../.env" });
} else {
    dotenv.config({ path: "../.env.dev" });
}




const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
    JWT_SECRET,
    FRONT_END_URL,
    DOMAIN,
    GOOGLE_LOGIN_KEY,
    FACEBOOK_LOGIN_KEY
} = process.env;

const config = {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
    JWT_SECRET,
    FRONT_END_URL,
    DOMAIN,
    GOOGLE_LOGIN_KEY,
    FACEBOOK_LOGIN_KEY
};

if (process.env.NODE_ENV === "production") {
    config.MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
} else {
    config.MONGO_HOSTNAME = "127.0.0.1";
    config.MONGO_URL = `mongodb://${config.MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;
}

module.exports = config;
