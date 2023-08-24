//  inport extions
var express = require('express');
var ejs = require("ejs");

// cookies & Session
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require("connect-flash");

// http & Https Live server 
var https = require("https");
var http = require("http");

// Fs Path File audle
const path = require('path');

// Date Format
var moment = require('moment');

// Controller
var httpsOptions = require("./config/https.js");
var Connection = require("./config/connection.js");
var CheckLogin = require("./middleware/userverification.js")
var CategController = require("./controllers/categorycontroller")

// Object 
var checklogin = new CheckLogin();
categcontroller = new CategController();

// Creating app &  Set view engine
var app = express();
app.set("view engine", "ejs");


// port number & Token for Cookies
var port = process.env.PORT || 2023;
process.env.TOKEN_SECRET = require("crypto").randomBytes(64).toString('hex');


// Middleware Setup:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Date Formate Set Middleware
var shortDateFormat = "Do MMMM, YYYY HH:MM:SS";
app.locals.moment = moment;
app.locals.shortDateFormat = shortDateFormat;


// Set Cookies & flase session
app.use(cookieParser());
app.use(express.urlencoded({
    extended: false
}));
app.use(session({
    cookie: {
        maxAge: 60000
    },
    secret: 'Techlearno',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// App Used Middleware for Msg
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    var UserName = req.cookies.UserName;
    var token = req.cookies.token;
    if (token == null) {
        res.locals.is_User = false;
        res.locals.user = "";
        res.locals.UserName = "";
    } else {
        res.locals.user = token;
        res.locals.UserName = UserName;
        res.locals.is_User = true;
        res.locals.Roll = req.session.Roll;
    }
    res.locals.catdata;
    categcontroller.CategoryFinddata(cb => {
        res.locals.catdata = cb.data;
        next();
    });
});


// Static  File For Site internal || Site & Admin
app.use("/site/assets", express.static(__dirname + "/public/site/assets"));
app.use("/site/css", express.static(__dirname + "/public/site/css"));
app.use("/site/vendor", express.static(__dirname + "/public/site/vendor"));
app.use("/site/media", express.static(__dirname + "/public/site/media"));

// Admin 
app.use("/admin/images", express.static(__dirname + "/public/admin/images"));
app.use("/public/uploads", express.static(path.join(__dirname, "public", "uploads")));
app.use("/admin/css", express.static(__dirname + "/public/admin/css"));
app.use("/admin/js", express.static(__dirname + "/public/admin/js"));
app.use("/admin/font", express.static(__dirname + "/public/admin/font"));
app.use("/admin/menu", express.static(__dirname + "/public/admin/menu"));


// Routs
app.use("/", require("./routes/mainpagerout.js"));
app.use("/admin", require("./routes/admin/adminrout.js"));
app.use("/admin/user", require("./routes/admin/userrout.js"));
app.use("/admin/category", require("./routes/admin/categoryrout.js"));
app.use("/admin/courses", require("./routes/admin/coursesrout.js"));

// Error page 
app.get("/*", (req, res) => {
    return res.status(404).render("../views/site/mainpage/error-404.ejs", { title: "Error 404 " });
});


// Creating server This Port
http.createServer(httpsOptions, app).listen(port, () => {
    console.log("Server Runing on this port" + port);
    console.log(`http://localhost:${port}`);
});