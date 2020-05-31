const address = require("address");

const express = require("express");
const router = express.Router();

const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");

const User = require("../models/user.model");
const Device = require("../models/device.model");

const signToken = (userID) => {
    return JWT.sign(
        {
            iss: "mj",
            sub: userID,
        },
        "mj"
    );
};

router.route("/register").post((req, res) => {
    const { username, password } = req.body;

    User.findOne({ username }, (err, user) => {
        if (err) {
            res.status(500).json({
                message: { msgBody: "Error has occured", msgError: true },
            });
        }
        if (user) {
            res.status(400).json({
                message: {
                    msgBody: "Username is already taken",
                    msgError: true,
                },
            });
        } else {
            const newUser = new User({ username, password });

            newUser.save((err) => {
                if (err) {
                    res.status(500).json({
                        message: {
                            msgBody: "Error has occured",
                            msgError: true,
                        },
                    });
                } else {
                    res.status(201).json({
                        message: {
                            msgBody: "Account successfully created",
                            msgError: false,
                        },
                    });
                }
            });
        }
    });
});

router
    .route("/login")
    .post(passport.authenticate("local", { session: false }), (req, res) => {
        const { _id, username } = req.user;
        const token = signToken(_id);
        res.cookie("access_token", token, { httpsOnly: true, sameSite: true });
        res.status(200).json({
            isAuthenticated: true,
            user: username,
        });
    });

router
    .route("/logout")
    .get(passport.authenticate("jwt", { session: false }), (req, res) => {
        res.clearCookie("access_token");
        res.json({ user: { username: "" }, success: true });
    });

router
    .route("/authenticated")
    .get(passport.authenticate("jwt", { session: false }), (req, res) => {
        const { username, _id } = req.user;
        res.status(200).json({
            isAuthenticated: true,
            user: username,
            id: _id,
        });
    });

// get the details of a user
router
    .route("/users")
    .get(passport.authenticate("jwt", { session: false }), (req, res) => {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json("Error: " + err));
    });
router
    .route("/:id")
    .get(passport.authenticate("jwt", { session: false }), (req, res) => {
        User.findById(req.params.id)
            .then((data) => res.json(data.devices))
            .catch((err) =>
                res.status(500).json({
                    message: { msgBody: "Error", msgError: true },
                })
            );
    });

router.route("/device/:id").get((req, res) => {
    Device.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json(err));
});

router
    .route("/device")
    .post(passport.authenticate("jwt", { session: false }), (req, res) => {
        const device = new Device(req.body);
        device.save((err) => {
            if (err) {
                res.status(500).json({
                    message: { msgBody: "Error", msgError: true },
                });
                console.log(err);
            } else {
                req.user.devices.push(device);
                req.user.save((err) => {
                    if (err) {
                        res.status(500).json({
                            message: { msgBody: "Error", msgError: true },
                        });
                    } else {
                        res.status(200).json({
                            message: { msgBody: "Success!!", msgError: true },
                        });
                    }
                });
            }
        });
    });

router
    .route("/devices")
    .get(passport.authenticate("jwt", { session: false }), (req, res) => {
        User.findById({ _id: req.user._id })
            .populate("devices")
            .exec((err, document) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        message: {
                            msgBody: "Error has occured",
                            msgError: true,
                        },
                    });
                } else {
                    res.status(200).json({
                        devices: document.devices,
                        authenticated: true,
                    });
                }
            });
    });

router
    .route("/mac")
    .get(passport.authenticate("jwt", { session: false }), (req, res) => {
        const mac = address.mac(function (err, addr) {
            return addr;
        });
        res.status(200).json(mac);
    });
module.exports = router;
