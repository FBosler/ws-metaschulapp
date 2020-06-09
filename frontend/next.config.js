const dotenv = require("dotenv")

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: '../.env' });
} else {
  dotenv.config({ path: '../.env.dev' });
}

module.exports = {
  env: {
    FRONT_END_URL: process.env.FRONT_END_URL,
  },
};