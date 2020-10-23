const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
    const errors = validationResult(req);

    /**
     *  Check for errors. If there is any error
     *  then send the user
     *  422 HTTP status code (Unprocessable Entity)
     */
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    const user = new User(req.body);

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "Failed to create account",
            });
        }
        return res.json({
            name: user.name,
            email: user.email,
            id: user._id,
        });
    });
};
