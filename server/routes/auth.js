const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { signup } = require("../controllers/auth");

router.get("/test", (req, res) => res.send("kasjkal"));

router.post(
    "/signup",
    [
        check(
            "name",
            "Name should be between 3 to 32 characters long"
        ).isLength({
            min: 3,
            max: 32,
        }),
        check("email", "email is required").isEmail(),
        check(
            "password",
            "Password should be at least 3 characters in length"
        ).isLength({ min: 3 }),
    ],
    signup
);

module.exports = router;
