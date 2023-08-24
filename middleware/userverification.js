var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

class UserVerification {


    //for pages we need log in
    checkcookie = async(req, res, next) => {
        var is_user = res.locals.is_User;
        if (is_user == true) {
            next();
        } else {
            req.flash("error", "Log In First");
            return res.status(200).redirect("/login");
        }
    };

    // check if allredy log in to privent login again
    checkuserexicte = async(req, res, next) => {
        var is_user = res.locals.is_User;

        if (is_user === false || is_user === undefined) {
            return next();
        } else {
            req.flash("error", "First Log out");
            return res.status(200).redirect("/logout");
        }
    };

    authenticateToken = async(req, res, next) => {
        try {
            var output1 = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET);
            var output2 = jwt.verify(res.locals.user, process.env.TOKEN_SECRET);
            if (output1.UD === output2.UD) {
                next();
            } else {
                req.flash("error", "Log In First");
                return res.status(200).redirect("/LogIn");
            }
        } catch (E) {
            return res.status(200).redirect("/logout");
        }
    };

    UserID = async(req, res, next) => {
        try {
            var output = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET);
            return output;
        } catch (E) {
            return "Error";
        }
    }
}

module.exports = UserVerification;