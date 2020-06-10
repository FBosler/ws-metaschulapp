import App from "../models/App";
import User from "../models/User";
import { to } from "await-to-js";

async function fetchAppById(id) {
    return await App.findById(id).exec();
}

async function fetchAllApps() {
    return await App.find({}).exec();
}

async function rateApp({ appId, userId, rating, comment }) {
    console.log(appId, userId, rating, comment);
    return new Promise(async (resolve, reject) => {
        let err, app, user;
        [err, app] = await to(App.findById(appId));
        if (err) {
            return reject(err);
        }

        if (
            app.ratings.filter((rating) => {
                if (String(rating.byId) === userId) {
                    return true;
                }
            }).length > 0
        ) {
            return reject("You already rated this app");
        }

        [err, user] = await to(User.findById(userId));
        if (err) {
            return reject(err);
        }

        const newRating = {
            comment: comment,
            byId: userId,
            byName: user.name,
            value: rating,
        };

        app.ratings.push(newRating);

        const [updateErr, update] = await to(app.save());
        if (updateErr) {
            return reject(updateErr);
        }
        return resolve(update.ratings.slice(-1,)[0]);
    });
}

export { fetchAppById, fetchAllApps, rateApp };
