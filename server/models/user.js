const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true,
        },
        lastname: {
            type: String,
            maxlength: 32,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        encry_password: {
            type: String,
            required: true,
        },
        salt: String,
        devices: {
            type: ObjectId,
            ref: "Device",
        },
    },
    { timestamps: true }
);

userSchema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plainPassword) {
        return this.securePassword(plainPassword) === this.encry_password
            ? true
            : false;
    },
    securePassword: function (plainPassword) {
        if (!plainPassword) return "";

        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(plainPassword)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },
};

module.exports = mongoose.model("User", userSchema);
