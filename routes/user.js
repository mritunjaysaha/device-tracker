const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
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
        "mj",
        { expiresIn: "365d" }
    );
};

const { check, validationResult } = require("express-validator");

router
    .route("/mac")
    .get(passport.authenticate("jwt", { session: false }), (req, res) => {
        res.json(req.cookies);
    });

router.post(
    "/signup",
    [check("username").isEmail(), check("password").isLength({ min: 5 })],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: { msgBody: "Invalid email" },
                msgError: true,
            });
        }
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
    }
);

router.post(
    "/login",
    [check("username").isEmail(), check("password").isLength({ min: 1 })],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: { msgBody: "Username or password is wrong" },
                msgError: true,
            });
        }
        const { username } = req.body;

        User.findOne({ username }, (error, user) => {
            if (error || !user) {
                return res.status(400).json({
                    message: { msgBody: "User doesn't exists" },
                    msgError: true,
                });
            }
            const { _id } = user._id;
            const { username } = req.body;
            const token = signToken(_id);

            console.log("sign token: " + token);
            res.cookie("access_token", token, {
                httpsOnly: true,
                sameSite: true,
            });
            res.json({
                isAuthenticated: true,
                user: username,
            });
        });
    }
);

router
    .route("/logout")
    .get(passport.authenticate("jwt", { session: false }), (req, res) => {
        // res.clearCookie("access_token");
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

// sends the details of devices to the user
router
    .route("/devicelist")
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

// get the previous location coordinates of the current device
router
    .route("/coordinates/:mac")
    .get(passport.authenticate("jwt", { session: false }), (req, res) => {
        console.log("currentDevice location coordinates");
        Device.findOne({ mac: req.params.mac })
            .then((data) => {
                console.log(data);
                res.json(data);
            })
            .catch((err) => console.log(err));
    });

router
    .route("/update-coordinates/:mac")
    .post(passport.authenticate("jwt", { session: false }), (req, res) => {
        console.log(req.params.mac);
        console.log(req.body.latitude);
        console.log(req.body.longitude);
        console.log(req.body.accuracy);
        Device.findOneAndUpdate(
            { mac: req.params.mac },
            {
                $set: {
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    accuracy: req.body.accuracy,
                },
            },
            {
                new: true,
            },
            (err, doc) => {
                if (err) {
                    res.status(500).json({
                        message: { msgBody: "Error" },
                        msgError: true,
                    });
                } else {
                    res.json(doc);
                }
            }
        );
    });
module.exports = router;
