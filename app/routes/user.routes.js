const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");

var fetchuser = require('../middleware/fetchuser');

const UserCtrl = require('../controllers/user.controller');

// ROUTE 1: Register
router.post("/register", [
    check("name")
        .isLength({ min: 3 })
        .withMessage("the name must have minimum length of 3")
        .trim(),

    check("email")
        .isEmail()
        .withMessage("invalid email address")
        .normalizeEmail(),

    check("password")
        .isLength({ min: 8, max: 15 })
        .withMessage("your password should have min and max length between 8-15")
        .matches(/\d/)
        .withMessage("your password should have at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage("your password should have at least one sepcial character"),

    // check("confirmPassword").custom((value, { req }) => {
    //     if (value !== req.body.password) {
    //         console.log(req.body.password, req.body.confirmPassword);
    //         throw new Error("confirm password does not match");
    //     }
    //     return true;
    // }),
],
function (req, res, next) {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
        res.status(422).json({ error: error.array() });
    } else {
        next();
    }
}, UserCtrl.apiCreateUser);

// ROUTE 2: Login
router.post("/login", [
    check("email")
        .isEmail()
        .withMessage("invalid email address")
        .normalizeEmail(),
    check("password")
        .exists()
        .withMessage("Password cannot be blank")
],
function (req, res, next) {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
        res.status(422).json({ error: error.array() });
    } else {
        next();
    }
}, UserCtrl.apiUserLogin);

// ROUTE 3: getuser
router.post("/getuser", fetchuser, UserCtrl.apiGetUserById);

module.exports = router;