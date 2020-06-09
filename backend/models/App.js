import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: [
            "Biologie",
            "Chemie",
            "Informatik",
            "Englisch",
            "Französisch",
            "Geographie",
            "Deutsch",
            "Geschichte",
            "Latein",
            "Mathematik",
            "Musik",
            "Physik",
        ],
    },
    coveredGrades: {
        type: [String],
        enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    },
});

const UserSchema = new mongoose.Schema(
    {
        createdAt: { type: Date, default: Date.now },
        name: { type: String },
        url: { type: String },
        description: { type: String },
        focusesOn: { type: [String], enum: ["Eltern", "Lehrer", "Schüler"] },
        applicableTo: {
            subjects: {
                type: [SubjectSchema],
            },
            schoolTypes: {
                type: [String],
                enum: ["Grundschule", "Hauptschule", "Gymnasium", "Realschule", "Gesamtschule"],
            },
        },
        nativeApp: { type: [String], enum: ["Iphone", "Android", "Ipad", "Mac", "PC"] },
        requiresInternet: { type: Boolean },
        images: {},
    },
    { strict: false },
    { versionKey: false }
);

export default mongoose.model("User", UserSchema);
