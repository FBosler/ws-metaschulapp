import mongoose from "mongoose";

const SCHOOLTYPES = [
    "Kindergarte",
    "Grundschule",
    "Hauptschule",
    "Gymnasium",
    "Realschule",
    "Gesamtschule",
    "Förderschule",
    "Berufliche Schule",
];

const SUBJECTS = [
    "fachunabhängige Verwendung",
    "Arbeitslehre",
    "Astronomie",
    "Berufsvorbereitung",
    "Biologie",
    "Chemie",
    "Deutsch",
    "Deutsch als Zweitsprache (DaZ)",
    "Deutsch als Fremdsprache (DaF)",
    "Englisch",
    "Erdkunde/Geografie",
    "Ethik",
    "Evangelische Religionslehre",
    "Französisch",
    "Gemeinschaftskunde",
    "Geschichte",
    "Gesellschaftslehre",
    "Informatik",
    "Katholische Religionslehre",
    "Kunst",
    "Latein",
    "Mathematik",
    "Musik",
    "Naturwissenschaften",
    "Pädagogik",
    "Physik",
    "Politik",
    "Praktische Philosophie",
    "Russisch",
    "Sachunterricht",
    "Sozialwissenschaften",
    "Spanisch",
    "Sprachen",
    "Technik",
    "Wirtschaft",
    "Alle",
];

const USECASE = [
    "Organisation/Administration",
    "Unterrichtsvorbereitung",
    "Unterrichtsdurchführung",
    "Selbstlernen",
    "Fortbildung für Lehrer*innen",
    "Infrastruktur",
    "Alle",
];

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: SUBJECTS,
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
        useCase: {type: [String], enum: USECASE},
        applicableTo: {
            subjects: {
                type: [SubjectSchema],
            },
            schoolTypes: {
                type: [String],
                enum: SCHOOLTYPES,
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
