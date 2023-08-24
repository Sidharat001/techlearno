var express = require('express');
var router = express.Router();
var mongooe = require('mongoose');
var bodyParser = require('body-parser');

// Controller
const Userscontroller = require('../../controllers/Userscontroller.js')
var UserVerification = require("../../middleware/userverification.js");
var JWT = require("../../controllers/jwt.js");

// Controller Object
const userController = new Userscontroller();
var userverification = new UserVerification();
var jwt = new JWT();


// Dashboard 
router.get(["/dashboard"], userverification.checkcookie, async(req, res) => {
    return res.status(200).render("../views/admin/mainpages/dashboard.ejs", {
        title: "Dashboard"
    });
});

// Login 
router.get(["/", "/Home", "/index", "/loginuser", "/Login"], userverification.checkuserexicte, async(req, res) => {
    return res.status(200).render("../views/admin/mainpages/loginuser.ejs", {
        title: "Login  - Techlearno.com"
    });
});


//Post Route from contact us to send email 
router.post("/Userloginform", userverification.checkuserexicte, async(req, res) => {
    // Login Data with Login inpute
    var userlogin = await userController.UserLogin(req.body.loginname, req.body.loginpassword);
    // Error  and success
    if (userlogin.Status === 'suc') {
        var token = await jwt.generateAccessToken({ uid: userlogin.User.UID });
        res.cookie("token", token, { maxAge: 60 * 1000 * 60, httpOnly: true });
        res.cookie("UserName", userlogin.User.AURName, { maxAge: 60 * 1000 * 60, httpOnly: true });
        req.session.Roll = userlogin.User.AURRoll;
        req.flash("success", "Log in Done");
        return res.status(200).redirect("/admin/dashboard");
    } else {
        req.flash("error", userlogin.Msg);
        return res.status(200).redirect("/admin/login");
    }
});

// Route to log out
router.get(["/Logout", "/SignOut"], (req, res) => {
    res.cookie("token", null, { expires: new Date(0), httpOnly: true });
    res.clearCookie("token");
    res.cookie("UserName", null, { expires: new Date(0), httpOnly: true });
    res.clearCookie("UserName");
    req.session.tim = null;
    res.locals.is_User = false;
    req.session.Roll = null;
    req.flash("success", "Log Out Done");
    return res.status(200).redirect("/admin/LogIn");
});


module.exports = router;