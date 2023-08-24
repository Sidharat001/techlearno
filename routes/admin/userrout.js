var express = require('express');
var router = express.Router();
 var User = require('../../module/UserModule');
 
// Controller
var User = require('../../controllers/Userscontroller.js')
var UserVerification = require("../../middleware/userverification.js");

// Object
var user = new User();
var userverification = new UserVerification();



// Add User 
router.get(["/add-user", "/add_user", "/add user"],  userverification.checkcookie, async(req, res) => {
    return res.status(200).render("../views/admin/user/add-user.ejs", {
        title: "Add User  - Techlearno.com"
    });
});

// User Save
router.post("/adduser", userverification.checkcookie, async(req, res) => {
     await user.SaveUserData(req.body, (cb) => {
        // Error  and success
        if (cb.Status === 'suc') {
            req.flash("success", cb.Msg)
            res.status(200).redirect("/admin/user/user-list");
        } else {
            req.flash("error", cb.Msg)
            res.status(404).redirect("/admin/user/add-user")
        }
    });
}); 


// User User  List
router.get(["/user-list", "/user_list", "User List"], userverification.checkcookie, async(req, res) => {
    await user.GetAllUser((cb) => {
        return res.status(200).render("../views/admin/user/user-list.ejs", {
            title: "User - Techlearno.com",
            Data: cb.data
        });
    });
});


module.exports = router;