var express = require('express');
const cheerio = require('cheerio');
var router = express.Router();
var mongooe = require('mongoose');

// Confing File & Controller 
var OgData = require("../config/Og.json");
var CoursesDetailsControler = require("../controllers/coursescontroller")

// Object
courses_details = new CoursesDetailsControler();


// Og tag Data Conne 
function getogdata(OgData, page) {
    var ogdata;
    OgData.Pages.forEach(element => {
        if (element.page == page) {
            ogdata = element;
        }
    });
    return ogdata;
};


// Route Main Folder


// Home
router.get(["/", "/index", "/Home", "/home"], (req, res) => {
    // Og tag Used
    var ogdata = getogdata(OgData, "Home");
    return res.status(200).render("../views/site/mainpage/index.ejs", {
        title: "Home - Techlearno.com ",
        tagdata: ogdata
    });
});

// Courses 
router.get(["/courses/:Title"], async (req, res) => {
    const SeoURLData = req.params.Title;
    await courses_details.CategoryFinddata(SeoURLData, (cb) => {
        if (cb.Status === 'suc') {
            req.flash("success", cb.Msg);
            return res.status(200).render("../views/site/mainpage/courses.ejs", { title: "Courses  - TaxManager.In", Data: cb.data });
        } else {
            req.flash("error", cb.Msg);
        }
    });
});

// Courses Details 
router.get(["/courses-details/:Seo_URL"], async (req, res) => {
    const SeoURL = req.params.Seo_URL;
    var ogdata = getogdata(OgData, SeoURL);
    var page = ogdata && ogdata.page ? ogdata.page : "";
    courses_details.getCourseDetails(SeoURL, (cb) => {
        if (cb.Status === 'suc') {
            req.flash("success", cb.Msg);
            return res.status(200).render("../views/site/mainpage/courses-details.ejs", { title: page, tagdata: ogdata, Data: cb.data });
        } else {
            req.flash("error", cb.Msg);
        }
    });
});


module.exports = router;