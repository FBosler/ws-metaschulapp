import mongoose from "mongoose";

const PLATFORMS = ["iOS", "Android", "Windows", "Mac OS", "Linux"];

const BROWSERS = ["Chrome", "Firefox", "Safari", "Edge"];

const APPTYPES = ["Web-Plattform", "native App", "Web-App", "YouTube-Channel", "Softwareprogramm"];

const STORES = ["Apple App-Store", "Google Play"];

const LICENSES = ["Einzellizenz", "offene Lizenz", "Schullizenz", "Klassenlizenz", "Fachschaftslizenz"];

const SCHOOLTYPES = [
    "Gymnasium",
    "Gesamtschule",
    "Realschule",
    "Schule mit mehreren Bildungsgängen",
    "Hauptschule",
    "Berufliche Schule",
    "Grundschule",
    "Förderschule",
    "Erwachsenenbildung",
    "Kindergarten",
];

const CLASSES = [
    "1./2. Schuljahr",
    "3./4. Schuljahr",
    "5./6. Schuljahr",
    "9./10. Schuljahr",
    "Sekundarstufe II",
    "Lebenslanges Lernen",
];

const SUBJECTS = [
    "Arbeitslehre",
    "Astronomie",
    "Berufsvorbereitung",
    "Biologie",
    "Chemie",
    "Deutsch",
    "Deutsch als Fremdsprache (DaF)",
    "Deutsch als Zweitsprache (DaZ)",
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
    "Physik",
    "Politik",
    "Praktische Philosophie",
    "Pädagogik",
    "Russisch",
    "Sachunterricht",
    "Sozialwissenschaften",
    "Spanisch",
    "Sprachen",
    "Technik",
    "Wirtschaft",
    "fachunabhängige Verwendung",
];

const USECASE = [
    "Organisation/Administration",
    "Infrastruktur",
    "Nachhilfe",
    "Selbstlernen",
    "Unterrichtsvorbereitung",
    "Unterrichtsdurchführung",
    "Fortbildung für Lehrer*innen",
];

const TEACHINGPHASES = [
    "Anwenden",
    "Einführen",
    "Erarbeiten",
    "Hausaufgaben",
    "Produkt wird nicht im Unterricht eingesetzt",
    "Testen",
    "Üben",
];

const DIDACTICS = [
    "Einzelarbeit",
    "Gruppenarbeit",
    "Inklusion",
    "Projekt",
    "Quiz",
    "Spiel",
    "Vertretungsstunde",
    "flipped classroom",
    "offener Unterricht",
];


const RatingSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    comment: { type: String },
    by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    value: { type: Number },
});

const AppSchema = new mongoose.Schema(
    {
        createdAt: { type: Date, default: Date.now },
        name: { type: String },
        provider: { type: String },
        url: { type: String },
        description: { type: String },
        focusesOn: { type: [String], enum: ["Eltern", "Lehrer", "Schüler", "Verwaltung"] },
        realeasedIn: { type: Number },
        supportedPlatforms: { type: [String], enum: PLATFORMS },
        supportedBrowser: { type: [String], enum: BROWSERS },
        requiresInternet: { type: Boolean },
        offlineModeAvailable: { type: Boolean },
        ratings: { type: [RatingSchema] },
        appTypes: { type: [String], enum: APPTYPES },
        stores: { type: [String], enum: STORES },
        licenses: { type: [String], enum: LICENSES },
        prices: {
            single: { type: String },
            studentAssociation: { type: String },
            class: { type: String },
            school: { type: String },
            other: { type: String },
        },
        schoolTypes: { type: [String], enum: SCHOOLTYPES },
        classes: { type: [String], enum: CLASSES },
        subjects: { type: [String], enum: SUBJECTS },
        useCase: { type: [String], enum: USECASE },
        teachingPhases: { type: [String], enum: TEACHINGPHASES },
        didactics: { type: [String], enum: DIDACTICS },
        images: {},
    },
    { strict: false },
    { versionKey: false }
);

export default mongoose.model("App", AppSchema);
