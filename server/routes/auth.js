const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { signup, signin, signout, isSignedIn } = require("../controllers/auth");

router.post(
    "/signup",
    [
        check(
            "name",
            "Name should be between 3 to 32 characters long"
        ).isLength({
            min: 2,
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

router.post(
    "/signin",
    [
        check("email", "email is required").isEmail(),
        check("password", "password field is required").isLength({ min: 1 }),
    ],
    signin
);

router.get("/singout", signout);

module.exports = router;
