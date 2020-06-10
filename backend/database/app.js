import App from "../models/App";

async function fetchAppById(id) {
    return await App.findById(id).exec();
}

async function fetchAllApps() {
    return await App.find({}).exec();
}

export { fetchAppById, fetchAllApps};
