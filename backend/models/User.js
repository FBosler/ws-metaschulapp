import mongoose from "mongoose";

const ThirdPartyProviderSchema = new mongoose.Schema({
    providerName: {
        type: String,
        default: null,
    },
    providerId: {
        type: String,
        default: null,
    },
    providerData: {
        type: {},
        default: null,
    },
});

const UserSchema = new mongoose.Schema(
    {
        createdAt: {
            type: Date,
            default: Date.now,
        },
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        classification: {
            type: {
                type: String,
                enum: ["student", "teacher", "tutor", "parent"],
                default: "student",
            },
            information: {
                type: {},
                default: null,
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        emailIsVerified: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        referralCode: {
            type: String,
            default: function () {
                let hash = 0;
                for (let i = 0; i < this.email.length; i++) {
                    hash = this.email.charCodeAt(i) + ((hash << 5) - hash);
                }
                let res = (hash & 0x00ffffff).toString(16).toUpperCase();
                return "00000".substring(0, 6 - res.length) + res;
            },
        },
        referredBy: {
            type: String,
            default: null,
        },
        thirdPartyAuth: [ThirdPartyProviderSchema],
        permissions: {
            role: {
                type: String,
                enum: ["student", "admin", "teacher", "parent", "tutor"],
                default: "teacher",
            },
        },
        assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { strict: false },
    { versionKey: false }
);

UserSchema.methods.public = function () {
    const { _id, classification, name, email, permissions, description } = this.toObject();
    return { _id, classification, name, email, permissions, description };
};

UserSchema.methods.tokenInfo = function () {
    let tempDoc = this.toObject();
    delete tempDoc.password;
    delete tempDoc.thirdPartyAuth;
    delete tempDoc.referredBy;
    delete tempDoc.assignedTo;
    tempDoc.id = tempDoc._id;
    delete tempDoc._id;
    delete tempDoc.createdAt;
    delete tempDoc.__v;
    delete tempDoc.thirdPartyAuth;
    return tempDoc;
};

export default mongoose.model("User", UserSchema);
